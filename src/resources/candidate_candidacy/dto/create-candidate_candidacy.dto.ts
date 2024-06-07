import { IsInt } from 'class-validator';

export class CreateCandidateCandidacyDto {
  @IsInt()
  Candidacy_Candidacy_id: number;

  @IsInt()
  candidacy_id: any;

  @IsInt()
  candidate: any;
}
