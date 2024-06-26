import { IsDate, IsInt, IsString, Max } from 'class-validator';

export class CreateJobOfferDto {
  @IsInt()
  JO_id: number;

  @IsString()
  title: string;

  @IsString()
  @Max(250)
  description: string;

  @IsString()
  @Max(250)
  requisites: string;

  @IsString()
  @Max(250)
  responsibilities: string;

  @IsString()
  @Max(250)
  benefits: string;

  @IsString()
  @Max(15)
  status: string;

  @IsDate()
  deadline: Date;
}
