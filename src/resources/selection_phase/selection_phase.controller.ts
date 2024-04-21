import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SelectionPhaseService } from './selection_phase.service';
import { CreateSelectionPhaseDto } from './dto/create-selection_phase.dto';
import { UpdateSelectionPhaseDto } from './dto/update-selection_phase.dto';

@Controller('selection-phase')
export class SelectionPhaseController {
  constructor(private readonly selectionPhaseService: SelectionPhaseService) {}

  @Post()
  create(@Body() createSelectionPhaseDto: CreateSelectionPhaseDto) {
    return this.selectionPhaseService.create(createSelectionPhaseDto);
  }

  @Get()
  findAll() {
    return this.selectionPhaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionPhaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelectionPhaseDto: UpdateSelectionPhaseDto) {
    return this.selectionPhaseService.update(+id, updateSelectionPhaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectionPhaseService.remove(+id);
  }
}
