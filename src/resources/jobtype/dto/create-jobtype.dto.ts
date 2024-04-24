import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateJobTypeDto {
  @IsInt()
  type_id: number;

  @IsString()
  @MaxLength(250)
  @MinLength(1)
  jobtype_desc: string;

  constructor(type_id: number = null, jobtype_desc: string = '') {
    this.type_id = type_id;
    this.jobtype_desc = jobtype_desc;
  }
}
