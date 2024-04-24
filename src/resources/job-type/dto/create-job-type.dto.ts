import { IsInt, IsString, Max } from 'class-validator';

export class CreateJobTypeDto {
  @IsInt()
  type_id: number;

  @IsString()
  @Max(250)
  jobtype_desc: string;

  constructor(type_id: number = null, jobtype_desc: string = '') {
    this.type_id = type_id;
    this.jobtype_desc = jobtype_desc;
  }
}
