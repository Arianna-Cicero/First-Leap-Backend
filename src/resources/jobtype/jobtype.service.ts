import { Injectable } from '@nestjs/common';
import { CreateJobtypeDto } from './dto/create-jobtype.dto';
import { UpdateJobtypeDto } from './dto/update-jobtype.dto';

@Injectable()
export class JobtypeService {
  create(createJobtypeDto: CreateJobtypeDto) {
    return 'This action adds a new jobtype';
  }

  findAll() {
    return `This action returns all jobtype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobtype`;
  }

  update(id: number, updateJobtypeDto: UpdateJobtypeDto) {
    return `This action updates a #${id} jobtype`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobtype`;
  }
}
