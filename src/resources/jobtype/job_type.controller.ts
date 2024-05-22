import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobtypeService } from './job_type.service';
import { CreateJobTypeDto } from './dto/create-job_type.dto';
import { UpdateJobTypeDto } from './dto/update-job_type.dto';

@Controller('jobtype')
export class JobtypeController {
  constructor(private readonly jobtypeService: JobtypeService) {}

  @Post()
  async create(@Body() createJobTypeDto: CreateJobTypeDto) {
    return this.jobtypeService.create(createJobTypeDto);
  }

  @Get()
  async findAll() {
    return this.jobtypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobtypeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobtypeDto: UpdateJobTypeDto,
  ) {
    return this.jobtypeService.update(+id, updateJobtypeDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.jobtypeService.remove(+id);
  // }
}
