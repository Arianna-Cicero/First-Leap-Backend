import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsDate,
  isInt,
} from 'class-validator';

export class CreateSelectionprocessDto {
  @IsInt()
  SP: number;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  description: string;

  @IsInt()
  @MinLength(1)
  @MaxLength(250)
  vacancies: number;

  @IsInt()
  phase: number;

  @IsDate()
  starting_date: Date;
}
