import { Controller,Post,Get,Param,Body,Patch,Delete } from '@nestjs/common';
import { SelectionProcessService } from './selection_process.service';
import { CreateSelectionprocessDto } from './dto/create-selection_process.dto';
import { UpdateSelectionprocessDto } from './dto/update-selection_process.dto';


@Controller('selection-process')
export class SelectionProcessController {
  constructor(private readonly selectionProcessService: SelectionProcessService) {}

  @Post()
  create(@Body() createSelectionProcessDto: CreateSelectionprocessDto) {
    return this.selectionProcessService.create(createSelectionProcessDto);
  }

  @Get()
  findAll() {
    return this.selectionProcessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selectionProcessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelectionProcessDto: UpdateSelectionprocessDto) {
    return this.selectionProcessService.update(+id, updateSelectionProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectionProcessService.remove(+id);
  }
}