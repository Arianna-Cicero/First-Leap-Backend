import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
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


  @Get('find-id/:username')
  async findIdByUser(@Param('username') username: string) {
    try {
      const userId = await this.candidateService.findIdByUser(username);
      if (userId) {
        return { userId };
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      console.error('Error finding user ID:', error);
      throw new NotFoundException('User not found');
    }
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