import { Injectable } from '@nestjs/common';
import { CreateEmailverificationDto } from './dto/create-emailverification.dto';
import { UpdateEmailverificationDto } from './dto/update-emailverification.dto';
import { EntityManager, Repository } from 'typeorm';
import { Emailverification } from './entities/emailverification.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmailverificationService {
  constructor(
    @InjectRepository(Emailverification)
    private readonly emailRepository: Repository<Emailverification>,
    private readonly entityManager: EntityManager,
  ) {}
  
  async create(createEmailverificationDto: CreateEmailverificationDto) {
    const newEmailverification = await this.emailRepository.save(createEmailverificationDto);
    return newEmailverification;
  }
  

  async findAll() {
    return await this.emailRepository.find();
  }

  async findOne(id: number) {
    return await this.emailRepository.find({
      where: {
        email_ver_id: id,
      },
    });
  }

  async update(
    id: number,
    updateEmailverificationDto: UpdateEmailverificationDto,
  ) {
    await this.emailRepository.update(id, updateEmailverificationDto);
    const updatedEmail = await this.emailRepository.findOne({
      where: { email_ver_id: id },
    });
    await this.emailRepository.find;
    if (!updatedEmail) {
      throw new Error('Email nao foi encontrado');
    }

    return updatedEmail;
  }

  // async remove(id: number) {
  //   await this.emailRepository.delete(id);
  //   return `emailverification de ID #${id} eliminado`;
  // }
}
