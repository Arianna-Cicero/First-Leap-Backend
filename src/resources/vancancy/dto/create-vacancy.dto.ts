import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateVacancyDto {
  @IsInt()
  vacancy_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  title: string;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  description: string;

  @IsInt()
  Job_OfferJO_id: number;
}
