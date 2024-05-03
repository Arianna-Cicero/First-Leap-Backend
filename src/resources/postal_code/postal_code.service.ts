import { Injectable } from '@nestjs/common';
import { CreatePostalCodeDto } from './dto/create-postal_code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal_code.dto';
import { EntityManager, Repository } from 'typeorm';
import { PostalCode } from './entities/postal_code.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostalCodeService {
  constructor(
    @InjectRepository(PostalCode)
    private readonly postalcodeRepository: Repository<PostalCode>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createPostalCodeDto: CreatePostalCodeDto) {
    const postalcode = new PostalCode(createPostalCodeDto);
    await this.entityManager.save(postalcode);
    return 'This action adds a new postalCode';
  }

  async findAll() {
    return this.postalcodeRepository.find();
  }

  async findOne(id: number) {
    return 'this.postalcodeRepository.findOneBy({ id })';
  }

  update(id: number, updatePostalCodeDto: UpdatePostalCodeDto) {
    return `This action updates a #${id} postalCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} postalCode`;
  }
}
