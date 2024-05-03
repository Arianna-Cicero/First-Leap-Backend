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
    return 'Novo postal code adicionado';
  }

  async findAll() {
    return this.postalcodeRepository.find();
  }

  async findOne(id: number) {
    return this.postalcodeRepository.findOne({ where: { pc: id } });
  }

  async update(id: number, updatePostalCodeDto: UpdatePostalCodeDto) {
    await this.postalcodeRepository.update(id, updatePostalCodeDto);
    const updatedPostalCode = await this.postalcodeRepository.findOne({
      where: { pc: id },
    });
    this.postalcodeRepository.find();
    if (!updatedPostalCode) {
      throw new Error('Postal Code nao encontrado');
    }
    return updatedPostalCode;
  }

  async remove(id: number) {
    return this.postalcodeRepository.delete(id);
  }
}
