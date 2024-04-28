import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobtypeService } from './jobtype.service';
import { CreateJobTypeDto } from './dto/create-jobtype.dto';
import { UpdateJobTypeDto } from './dto/update-jobtype.dto';

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.jobtypeService.remove(+id);
  }
}
