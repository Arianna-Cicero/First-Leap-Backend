import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectionPhaseDto } from './create-selection_phase.dto';

export class UpdateSelectionPhaseDto extends PartialType(CreateSelectionPhaseDto) {}
