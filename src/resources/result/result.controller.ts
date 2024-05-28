import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  async create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  async findAll() {
    return this.resultService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.resultService.findOne(+id);
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateResultDto: UpdateResultDto,
  // ) {
  //   return this.resultService.update(+id, updateResultDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
