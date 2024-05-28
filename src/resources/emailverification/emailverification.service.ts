import { Injectable } from '@nestjs/common';
import { CreateEmailverificationDto } from './dto/create-emailverification.dto';
import { UpdateEmailverificationDto } from './dto/update-emailverification.dto';
import { EntityManager, Repository } from 'typeorm';
import { Emailverification } from './entities/emailverification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilizador } from '../utilizador/entities/utilizador.entity';

@Injectable()
export class EmailverificationService {
  constructor(
    @InjectRepository(Emailverification)
    private readonly emailRepository: Repository<Emailverification>,
  ) {}

  async createVerificationRecord(verificationCode: number, utilizador: Utilizador, entityManager: EntityManager) {
    const emailVerification = this.emailRepository.create({
        utilizador: utilizador,
        expiry_datetime: new Date(Date.now() + 24 * 60 * 60 * 1000), // One day from now
        Verification_code: verificationCode,
    });
    await entityManager.save(emailVerification); // Using the transactional entity manager
  }
  
  async findByUserId(userId: number): Promise<Emailverification | undefined> {
    return this.emailRepository.findOne({ where: { utilizador: { User_id: userId } } });
  }

  async removeByUserId(userId: number): Promise<void> {
    await this.emailRepository.delete({ utilizador: { User_id: userId } });
  }

  async create(createEmailverificationDto: CreateEmailverificationDto) {
    const newEmailverification = await this.emailRepository.save(createEmailverificationDto);
    return newEmailverification;
  }

  async findAll() {
    return await this.emailRepository.find();
  }

  async findCode(userId: number) {
    return await this.emailRepository.find({
      where: {
        utilizador: { User_id: userId },
      },
      select: ['Verification_code'],
    });
  }



  async findOneByUserId(userId: number) {
    return await this.emailRepository.findOne({
      where: { utilizador: { User_id: userId } },
    });
  }

  // async findCode(id: number) {
  //   return await this.emailRepository.find({
  //     where: {
  //       email_ver_id: id,
  //     },
  //     select: ['Verification_code'],
  //   });
  // }

  async update(
    id: number,
    updateEmailverificationDto: UpdateEmailverificationDto,
  ) {
    await this.emailRepository.update(id, updateEmailverificationDto);
    const updatedEmail = await this.emailRepository.findOne({
      where: { email_ver_id: id },
    });
    if (!updatedEmail) {
      throw new Error('Email verification record not found');
    }
    return updatedEmail;
  }
}
