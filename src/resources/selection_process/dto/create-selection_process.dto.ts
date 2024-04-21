import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateSelectionProcessDto {
  @IsInt()
  @Min(1)
  SP_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  description: string;

  @IsInt()
  @Min(1)
  vacancies: number;

  @IsInt()
  @Min(1)
  phase: number;

  constructor(
    SP_id: number = null,
    description: string = '',
    vacancies: number = null,
    phase: number = null,
  ) {
    this.SP_id = SP_id;
    this.description = description;
    this.vacancies = vacancies;
    this.phase = phase;
  }
}
