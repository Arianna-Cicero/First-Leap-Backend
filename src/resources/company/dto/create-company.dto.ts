import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateCompanyDto {
  @IsInt()
  @Min(1)
  company_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsInt()
  @Min(1)
  number: number;
}
