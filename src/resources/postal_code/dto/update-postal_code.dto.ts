import { PartialType } from '@nestjs/mapped-types';
import { CreatePostalCodeDto } from './create-postal_code.dto';

export class UpdatePostalCodeDto extends PartialType(CreatePostalCodeDto) {}
