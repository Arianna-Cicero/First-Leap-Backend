import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';
import { UtilizadorService } from '../utilizador/utilizador.service';
import { EmailverificationService } from '../emailverification/emailverification.service';
import { EmailService } from '@src/mailer/sendMail';
import { encodePassword } from '@src/auth/bcrypt';
@Injectable()
export class RecruiterService {
  constructor(
    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,
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
        await this.recruiterRepository.update(userId, { verificado: true });

        return { success: true, message: 'Verification successful' };
      } else {
        return { success: false, message: 'Verification code does not match' };
      }
    } else {
      return { success: false, message: 'Verification code not found' };
    }
  }

  async create(
    createRecruiterDto: CreateRecruiterDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ): Promise<Recruiter> {
    return this.entityManager.transaction(async (manager) => {
      createUtilizadorDto.password = await encodePassword(
        createUtilizadorDto.password,
      );
      const utilizador =
        await this.utilizadorService.create(createUtilizadorDto);
      const recruiter = new Recruiter(createRecruiterDto, utilizador);
      recruiter.utilizador = utilizador;
      const savedRecruiter = await manager.save(recruiter);

      // Generate a verification code
      const verificationCode = parseInt(
        this.generateNumericVerificationCode(),
        10,
      );

      // Create EmailVerification and link with Utilizador
      await this.emailVerificationService.createVerificationRecord(
        verificationCode,
        savedRecruiter,
        manager,
      );

      // Prepare the email template
      const emailTemplate = this.emailService.getEmailTemplate(
        'verification_code',
        verificationCode.toString(),
      );

      // Send the verification email
      await this.emailService.sendEmail(
        savedRecruiter.email,
        emailTemplate.subject,
        emailTemplate.text,
        emailTemplate.html,
      );

      return savedRecruiter;
    });
  }

  async findAll() {
    return await this.recruiterRepository.find();
  }

  async findOne(id: number) {
    return await this.recruiterRepository.findOne({
      where: { User_id: id },
    });
  }

  async update(
    id: number,
    updateRecruiterDto: UpdateRecruiterDto,
  ): Promise<Recruiter | undefined> {
    const recruiter = await this.recruiterRepository.findOne({
      where: { User_id: id },
    });
    if (!recruiter) {
      throw new NotFoundException(`Recruiter with ID ${id} not found`);
    }
    Object.assign(recruiter, updateRecruiterDto);
    return await this.recruiterRepository.save(recruiter);
  }

  // async findOne(
  //   identifier: number | FindOneOptions<Recruiter>,
  // ): Promise<Recruiter | undefined> {
  //   if (typeof identifier === 'number') {
  //     return await this.recruiterRepository.findOne({
  //       where: { User_id: identifier },
  //     });
  //   } else {
  //     return await this.recruiterRepository.findOne(identifier);
  //   }
  // }

  async remove(id: number) {
    return await this.recruiterRepository.delete(id);
  }
}
