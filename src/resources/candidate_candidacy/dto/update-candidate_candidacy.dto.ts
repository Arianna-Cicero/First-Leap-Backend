import { PartialType } from '@nestjs/mapped-types';
import { CreateCandidateCandidacyDto } from './create-candidate_candidacy.dto';

export class UpdateCandidateCandidacyDto extends PartialType(CreateCandidateCandidacyDto) {}
