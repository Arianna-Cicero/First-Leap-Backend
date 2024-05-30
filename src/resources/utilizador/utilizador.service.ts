import { Injectable } from '@nestjs/common';
import { EntityManager, Repository, FindOneOptions } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailverificationService } from '../emailverification/emailverification.service';
import { encodePassword } from '../../auth/bcrypt';
import { EmailService } from '../../mailer/sendMail';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';

@Injectable()
export class UtilizadorService {
  constructor(
    @InjectRepository(Utilizador)
    private readonly userRepository: Repository<Utilizador>,
    private readonly entityManager: EntityManager,
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
        await this.userRepository.update(userId, { verificado: true });

        return { success: true, message: 'Verification successful' };
      } else {
        return { success: false, message: 'Verification code does not match' };
      }
    } else {
      return { success: false, message: 'Verification code not found' };
    }
  }

  async create(createUtilizadorDto: CreateUtilizadorDto): Promise<Utilizador> {
    // Hash the password
    const hashedPassword = await encodePassword(createUtilizadorDto.password);

    // Create a new user with the hashed password
    const utilizador = this.userRepository.create({
      ...createUtilizadorDto,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUtilizador = await this.userRepository.save(utilizador);

    // Generate a verification code
    const verificationCode = parseInt(
      this.generateNumericVerificationCode(),
      10,
    );

    // Create a verification record
    await this.emailVerificationService.createVerificationRecord(
      verificationCode,
      savedUtilizador,
      this.entityManager,
    );

    // Prepare the email template
    const emailTemplate = this.emailService.getEmailTemplate(
      'verification_code',
      verificationCode.toString(),
    );

    // Send the verification email
    await this.emailService.sendEmail(
      savedUtilizador.email,
      emailTemplate.subject,
      emailTemplate.text,
      emailTemplate.html,
    );

    // Return the saved user
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

  async findIfVerified(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { User_id: userId },
      select: ['verificado'],
    });
    return user ? user.verificado : false; // Ensure this returns a boolean primitive
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
