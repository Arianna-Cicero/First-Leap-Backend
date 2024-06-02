import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';
import { Candidate } from './entities/candidate.entity';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async create(
    @Body() createCandidateDto: CreateCandidateDto,
    @Body() createUtilizadorDto: CreateUtilizadorDto,
  ): Promise<Candidate> {
    return this.candidateService.create(
      createCandidateDto,
      createUtilizadorDto,
    );
  }

  @Post('verify-email')
  async verifyEmail(@Body() body: { codigo: number; userId: number }) {
    return this.candidateService.emailverification(body.codigo, body.userId);
  }

  @Get()
  async findAll() {
    return this.candidateService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.candidateService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidateService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateService.remove(+id);
  }
}
