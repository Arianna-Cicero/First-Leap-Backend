import { IsString, IsInt, MinLength, MaxLength, IsDate } from 'class-validator';

export class CreateSelectionprocessDto {
  @IsInt()
  SP: number;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  description: string;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  vacancies: string;

  @IsInt()
  phase: number;

  @IsDate()
  starting_date: Date;
}
