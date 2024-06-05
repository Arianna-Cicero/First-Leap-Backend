import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CandidacyService } from './candidacy.service';
import { CreateCandidacyDto } from './dto/create-candidacy.dto';
import { UpdateCandidacyDto } from './dto/update-candidacy.dto';

@Controller('candidacy')
export class CandidacyController {
  constructor(private readonly candidacyService: CandidacyService) {}

  @Post('apply')
  async applyForJob(
    @Body('candidateId') candidateId: number,
    @Body('jobId') jobId: number,
  ) {
    return await this.candidacyService.applyForJob(candidateId, jobId);
  }

  // @Post()
  // async create(@Body() createCandidacyDto: CreateCandidacyDto) {
  //   return this.candidacyService.create(createCandidacyDto);
  // }

  @Get()
  async findAll() {
    return this.candidacyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.candidacyService.findOne(+id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateCandidacyDto: UpdateCandidacyDto,
  // ) {
  //   return this.candidacyService.update(+id, updateCandidacyDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.candidacyService.remove(+id);
  }
}
