import { IsDate, IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateResultDto {
  @IsInt()
  result_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  result_desc: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  comments: string;

  @IsDate()
  evaluation_date: Date;
}
