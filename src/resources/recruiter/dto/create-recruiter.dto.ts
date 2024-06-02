import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateRecruiterDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  company: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  position: string;
}
