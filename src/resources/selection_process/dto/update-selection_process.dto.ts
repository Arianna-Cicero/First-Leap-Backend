import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectionprocessDto } from './create-selection_process.dto';

export class UpdateSelectionprocessDto extends PartialType(CreateSelectionprocessDto) {}
