import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { SelectionProcessService } from './selection_process.service';
import { CreateSelectionprocessDto } from './dto/create-selection_process.dto';
import { UpdateSelectionprocessDto } from './dto/update-selection_process.dto';
import { CreateSelectionphaseDto } from '../selection_phase/dto/create-selection_phase.dto';

@Controller('selection-process')
export class SelectionProcessController {
  constructor(
    private readonly selectionProcessService: SelectionProcessService,
  ) {}

  @Post()
  create(
    @Body() createSelectionProcessDto: CreateSelectionprocessDto,
    // @Body() createSelectionPhaseDate: CreateSelectionphaseDto,
  ) {
    return this.selectionProcessService.create(
      createSelectionProcessDto,
      // createSelectionPhaseDate,
    );
  }

  @Get()
  async findAll() {
    return this.selectionProcessService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.selectionProcessService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSelectionProcessDto: UpdateSelectionprocessDto,
  ) {
    return this.selectionProcessService.update(+id, updateSelectionProcessDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.selectionProcessService.remove(+id);
  }
}
