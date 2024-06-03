import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';
import { UtilizadorService } from '../utilizador/utilizador.service';
import { EmailverificationService } from '../emailverification/emailverification.service';
import { EmailService } from '@src/mailer/sendMail';
import { encodePassword } from '../../auth/bcrypt';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private readonly entityManager: EntityManager,
    private readonly utilizadorService: UtilizadorService,
    private readonly emailVerificationService: EmailverificationService,
    private readonly emailService: EmailService,
  ) {}

  private generateNumericVerificationCode(length: number = 6): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  async emailverification(codigo: number, userId: number) {
    const codigodb = await this.emailVerificationService.findCode(userId);

    if (codigodb.length > 0 && codigodb[0].Verification_code) {
      if (codigo === codigodb[0].Verification_code) {
        await this.candidateRepository.update(userId, { verificado: true });

        return { success: true, message: 'Verification successful' };
      } else {
        return { success: false, message: 'Verification code does not match' };
      }
    } else {
      return { success: false, message: 'Verification code not found' };
    }
  }

  async create(
    createCandidateDto: CreateCandidateDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ): Promise<Candidate> {
    return this.entityManager.transaction(async (manager) => {
      createUtilizadorDto.password = await encodePassword(
        createUtilizadorDto.password,
      );

      const utilizador =
        await this.utilizadorService.create(createUtilizadorDto);
      const candidate = new Candidate(createCandidateDto, utilizador);
      candidate.utilizador = utilizador;
      const savedCandidate = await manager.save(candidate);

      const verificationCode = this.generateNumericVerificationCode();
      await this.emailVerificationService.createVerificationRecord(
        parseInt(verificationCode, 10),
        savedCandidate,
        manager,
      );

      const emailTemplate = this.emailService.getEmailTemplate(
        'verification_code',
        verificationCode,
      );

      await this.emailService.sendEmail(
        savedCandidate.email,
        emailTemplate.subject,
        emailTemplate.text,
        emailTemplate.html,
      );

      return savedCandidate;
    });
  }

  async findAll(): Promise<Candidate[]> {
    return await this.candidateRepository.find();
  }

  async findOne(id: number) {
    return await this.candidateRepository.findOne({
      where: { User_id: id },
    });
  }

  async findCandidateEmail(id: number) {
    return await this.candidateRepository.findOne({
      where: { User_id: id },
      select: ['email'],
    });
  }

  async findCVById(candidateId: number): Promise<Buffer> {
    const candidate = await this.candidateRepository.findOne({
      where: { User_id: candidateId },
      select: ['cv'],
    });
    if (candidate && candidate.cv) {
      return candidate.cv;
    } else {
      throw new Error('CV not found for candidate');
    }
  }

  async update(
    id: number,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    await this.candidateRepository.update(id, updateCandidateDto);
    this.candidateRepository.find;
    const updatedCandidate = await this.candidateRepository.findOne({
      where: { User_id: id },
    });
    if (!updatedCandidate) {
      throw new Error('candidato no encontrado');
    }
    return updatedCandidate;
  }

  async remove(id: number) {
    return await this.candidateRepository.delete(id);
  }
}
