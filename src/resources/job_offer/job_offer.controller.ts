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
import { JobOfferService } from './job_offer.service';
import { CreateJobOfferDto } from './dto/create-job_offer.dto';
import { UpdateJobOfferDto } from './dto/update-job_offer.dto';
import { CreateSelectionprocessDto } from '../selection_process/dto/create-selection_process.dto';
import { CreateVacancyDto } from '../vancancy/dto/create-vacancy.dto';
import { CreateRecruiterDto } from '../recruiter/dto/create-recruiter.dto';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';
import { JobOffer } from './entities/job_offer.entity';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Post()
  async create(
    @Body() createJobOfferDto: CreateJobOfferDto,
    createSelectionprocessDto: CreateSelectionprocessDto,
    createVacancyDto: CreateVacancyDto,
    // createRecruiterDto: CreateRecruiterDto,
    // createUtilizadorDto: CreateUtilizadorDto,
  ) {
    return this.jobOfferService.create(
      createJobOfferDto,
      createSelectionprocessDto,
      createVacancyDto,
      // createRecruiterDto,
      // createUtilizadorDto,
    );
  }

  @Get()
  async findAll() {
    return this.jobOfferService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<JobOffer> {
    const jobOffer = await this.jobOfferService.findOne(id);
    if (!jobOffer) {
      throw new NotFoundException('Job offer not found');
    }
    return jobOffer;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobOfferDto: UpdateJobOfferDto,
  ) {
    return this.jobOfferService.update(+id, updateJobOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.jobOfferService.remove(+id);
  }
}
