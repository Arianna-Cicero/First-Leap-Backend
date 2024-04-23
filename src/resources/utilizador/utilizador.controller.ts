import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtilizadorService } from './utilizador.service';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';

@Controller('utilizador')
export class UtilizadorController {
  constructor(private readonly utilizadorService: UtilizadorService) {}

  @Post()
  async create(@Body() createUtilizadorDto: CreateUtilizadorDto) {
    return this.utilizadorService.create(createUtilizadorDto);
  }

  @Get()
  findAll() {
    return this.utilizadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilizadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtilizadorDto: UpdateUtilizadorDto) {
    return this.utilizadorService.update(+id, updateUtilizadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilizadorService.remove(+id);
  }
}
