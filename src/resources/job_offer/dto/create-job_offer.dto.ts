import { IsInt, IsString, Max } from 'class-validator';

export class CreateJobOfferDto {
  @IsInt()
  JO: number;

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

  constructor(
    JO: number = null,
    title: string = '',
    description: string = '',
    requisites: string = '',
    responsibilities: string = '',
    benefits: string = '',
    status: string = '',
  ) {
    this.JO = JO;
    this.title = title;
    this.description = description;
    this.requisites = requisites;
    this.responsibilities = responsibilities;
    this.benefits = benefits;
    this.status = status;
  }
}
