import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectionphaseDto } from './create-selection_phase.dto';

export class UpdateSelectionphaseDto extends PartialType(CreateSelectionphaseDto) {}
