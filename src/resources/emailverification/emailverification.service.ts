import { Injectable } from '@nestjs/common';
import { CreateEmailverificationDto } from './dto/create-emailverification.dto';
import { UpdateEmailverificationDto } from './dto/update-emailverification.dto';

@Injectable()
export class EmailverificationService {
  create(createEmailverificationDto: CreateEmailverificationDto) {
    return 'This action adds a new emailverification';
  }

  findAll() {
    return `This action returns all emailverification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailverification`;
  }

  update(id: number, updateEmailverificationDto: UpdateEmailverificationDto) {
    return `This action updates a #${id} emailverification`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailverification`;
  }
}
