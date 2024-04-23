import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobtypeService } from './jobtype.service';
import { CreateJobtypeDto } from './dto/create-jobtype.dto';
import { UpdateJobtypeDto } from './dto/update-jobtype.dto';

@Controller('jobtype')
export class JobtypeController {
  constructor(private readonly jobtypeService: JobtypeService) {}

  @Post()
  create(@Body() createJobtypeDto: CreateJobtypeDto) {
    return this.jobtypeService.create(createJobtypeDto);
  }

  @Get()
  findAll() {
    return this.jobtypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobtypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobtypeDto: UpdateJobtypeDto) {
    return this.jobtypeService.update(+id, updateJobtypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobtypeService.remove(+id);
  }
}
