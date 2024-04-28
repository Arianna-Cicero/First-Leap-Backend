import { IsInt, IsTimeZone, Max, Min } from 'class-validator';

export class CreateEmailverificationDto {
  @IsInt()
  email_ver_id: number;

  @IsInt()
  Verification_code: number;

  @IsTimeZone()
  expiry_datetime: Date;
}
