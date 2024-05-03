import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTypeDto } from './create-jobtype.dto';

export class UpdateJobTypeDto extends PartialType(CreateJobTypeDto) {}
