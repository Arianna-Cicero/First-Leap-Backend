import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobOfferService } from './job_offer.service';
import { CreateJobOfferDto } from './dto/create-job_offer.dto';
import { UpdateJobOfferDto } from './dto/update-job_offer.dto';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Post()
  async create(@Body() createJobOfferDto: CreateJobOfferDto) {
    return this.jobOfferService.create(createJobOfferDto);
  }

  @Get()
  async findAll() {
    return this.jobOfferService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.jobOfferService.findOne(+id);
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
