import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateSelectionphaseDto {
  @IsInt()
  SPH: number;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  description: string;

  @IsInt()
  @Min(1)
  order: number;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  process: string;
}
