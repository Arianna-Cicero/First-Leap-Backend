// src/written-tests/written-test.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WrittenTest } from './entities/written_test.entity';

@Injectable()
export class WrittenTestService {
  constructor(
    @InjectRepository(WrittenTest)
    private readonly writtenTestRepository: Repository<WrittenTest>,
  ) {}

  async create(writtenTestData: Partial<WrittenTest>): Promise<WrittenTest> {
    return await this.writtenTestRepository.save(writtenTestData);
  }

  async findAll(): Promise<WrittenTest[]> {
    return await this.writtenTestRepository.find();
  }

  async findOne(id: number): Promise<WrittenTest> {
    return await this.writtenTestRepository.findOne({
      where: { written_test_id: id },
    });
  }

  async validateAnswer(answer: string, id: number): Promise<boolean> {
    const writtenTest = await this.writtenTestRepository.findOne({
      where: { written_test_id: id },
    });

    if (!writtenTest) {
      throw new NotFoundException('Test not found');
    }

    return writtenTest.answer.toLowerCase() === answer.toLowerCase();
  }
}
