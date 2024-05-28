import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TypeSelectionProcessService } from './type_selection_process.service';
import { CreateTypeSelectionProcessDto } from './dto/create-type_selection_process.dto';
import { UpdateTypeSelectionProcessDto } from './dto/update-type_selection_process.dto';

@Controller('type-selection-process')
export class TypeSelectionProcessController {
  constructor(
    private readonly typeSelectionProcessService: TypeSelectionProcessService,
  ) {}

  @Post()
  async create(
    @Body() createTypeSelectionProcessDto: CreateTypeSelectionProcessDto,
  ) {
    return this.typeSelectionProcessService.create(
      createTypeSelectionProcessDto,
    );
  }

  @Get()
  async findAll() {
    return this.typeSelectionProcessService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.typeSelectionProcessService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTypeSelectionProcessDto: UpdateTypeSelectionProcessDto,
  ) {
    return this.typeSelectionProcessService.update(
      +id,
      updateTypeSelectionProcessDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.typeSelectionProcessService.remove(+id);
  }
}
