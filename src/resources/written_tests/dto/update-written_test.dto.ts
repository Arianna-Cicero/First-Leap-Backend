import { PartialType } from '@nestjs/mapped-types';
import { CreateWrittenTestDto } from './create-written_test.dto';

export class UpdateWrittenTestDto extends PartialType(CreateWrittenTestDto) {}
