import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeSelectionProcessDto } from './create-type_selection_process.dto';

export class UpdateTypeSelectionProcessDto extends PartialType(CreateTypeSelectionProcessDto) {}
