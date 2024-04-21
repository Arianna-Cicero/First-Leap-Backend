import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailverificationDto } from './create-emailverification.dto';

export class UpdateEmailverificationDto extends PartialType(CreateEmailverificationDto) {}
