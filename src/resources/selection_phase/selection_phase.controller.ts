import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SelectionPhaseService } from './selection_phase.service';
import { CreateSelectionphaseDto } from './dto/create-selection_phase.dto';
import { UpdateSelectionphaseDto } from './dto/update-selection_phase.dto';
import { CreateTypeSelectionProcessDto } from '../type_selection_process/dto/create-type_selection_process.dto';

@Controller('selection-phase')
export class SelectionPhaseController {
  constructor(private readonly selectionPhase: SelectionPhaseService) {}

  @Post()
  async create(@Body() createResultDto: CreateSelectionphaseDto) {
    return this.selectionPhase.create(createResultDto);
  }

  @Get()
  async findAll() {
    return this.selectionPhase.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionPhase.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSelectionPhase: UpdateSelectionphaseDto,
  ) {
    return this.selectionPhase.update(+id, updateSelectionPhase);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.selectionPhase.remove(+id);
  }
}
