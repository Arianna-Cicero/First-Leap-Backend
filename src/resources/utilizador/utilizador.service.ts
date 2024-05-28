// utilizador.service.ts

import { Injectable } from '@nestjs/common';
import { EntityManager, Repository, FindOneOptions } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/bcrypt';
import { EmailService } from '@src/mailer/sendMail';
import { EmailverificationService } from '../emailverification/emailverification.service';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';

@Injectable()
export class UtilizadorService {
  constructor(
    @InjectRepository(Utilizador)
    private readonly userRepository: Repository<Utilizador>,
    private readonly entityManager: EntityManager,
    private readonly emailService: EmailService,
    private readonly emailVerificationService: EmailverificationService,
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
        await this.userRepository.update(userId, { verified: true });

        return { success: true, message: 'Verification successful' };
      } else {
        return { success: false, message: 'Verification code does not match' };
      }
    } else {
      return { success: false, message: 'Verification code not found' };
    }
  }

  async create(createUtilizadorDto: CreateUtilizadorDto): Promise<Utilizador> {
    const hashedPassword = await encodePassword(createUtilizadorDto.password);

    const utilizador = this.userRepository.create({
      ...createUtilizadorDto,
      password: hashedPassword,
    });

    const savedUtilizador = await this.userRepository.save(utilizador);

    const verificationCode = parseInt(
      this.generateNumericVerificationCode(),
      10,
    );

    await this.emailVerificationService.createVerificationRecord( 
      verificationCode,
      savedUtilizador,
      this.entityManager
    );

    const emailTemplate = this.emailService.getEmailTemplate(
      'verification_code',
      verificationCode.toString(),
    );
    await this.emailService.sendEmail(
      savedUtilizador.email,
      emailTemplate.subject,
      emailTemplate.text,
      emailTemplate.html,
    );

    return savedUtilizador;
  }

  async findUserByUsername(username: string) {
    const options: FindOneOptions = { where: { username } };
    return this.userRepository.findOne(options);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.find({
      where: {
        User_id: id,
      },
    });
  }

  async update(
    id: number,
    updateUtilizadorDto: UpdateUtilizadorDto,
  ): Promise<Utilizador> {
    await this.userRepository.update(id, updateUtilizadorDto);
    const updatedUser = await this.userRepository.findOne({
      where: { User_id: id },
    });
    if (!updatedUser) {
      throw new Error('utilizador no encontrado');
    }
    return updatedUser;
  }
}
