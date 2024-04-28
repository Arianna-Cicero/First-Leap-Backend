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
    const emailverification = new Emailverification(createEmailverificationDto);
    await this.entityManager.save(emailverification);
    return 'nuevo emailverification adicionado';
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
    const update = new Emailverification(updateEmailverificationDto);
    await this.emailRepository.save(update);
    return `emailverification de ID#${id} modificado`;
  }

  async remove(id: number) {
    await this.emailRepository.delete(id);
    return `emailverification de ID #${id} eliminado`;
  }
}
