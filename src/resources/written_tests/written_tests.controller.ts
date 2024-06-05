import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WrittenTest } from './entities/written_test.entity';
import { WrittenTestService } from './written_tests.service';
import { CreateWrittenTestDto } from './dto/create-written_test.dto';

@Controller('written-tests')
export class WrittenTestController {
  constructor(private readonly writtenTestService: WrittenTestService) {}

  @Post()
  async create(
    @Body() createWrittenTestDto: CreateWrittenTestDto,
  ): Promise<WrittenTest> {
    return await this.writtenTestService.create(createWrittenTestDto);
  }

  @Get()
  async findAll(): Promise<WrittenTest[]> {
    return await this.writtenTestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<WrittenTest> {
    return await this.writtenTestService.findOne(id);
  }

  @Post('validate-answer/:id')
  async validateAnswer(
    @Param('id') id: number,
    @Body('answer') answer: string,
  ): Promise<{ isCorrect: boolean }> {
    const isCorrect = await this.writtenTestService.validateAnswer(answer, id);
    return { isCorrect };
  }
}
