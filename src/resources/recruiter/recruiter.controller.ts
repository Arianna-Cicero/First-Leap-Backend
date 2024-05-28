import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

@Controller('recruiter')
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  async create(
    @Body() createRecruiterDto: CreateRecruiterDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ) {
    return this.recruiterService.create(
      createRecruiterDto,
      createUtilizadorDto,
    );
  }

  @Get()
  async findAll() {
    return this.recruiterService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.recruiterService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateRecruiterDto: UpdateRecruiterDto,
  // ) {
  //   return this.recruiterService.update(+id, updateRecruiterDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recruiterService.remove(+id);
  }
}
