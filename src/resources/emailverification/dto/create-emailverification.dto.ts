import { IsInt, IsString, IsTimeZone, Max, Min } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateEmailverificationDto {
  @IsInt()
  @Min(1)
  email_ver_id: number;

  @IsInt()
  @Max(6)
  @Min(6)
  Verification_code: number;

  @IsTimeZone()
  expiry_datetime: Date;

  constructor(
    email_ver_id: number = null,
    Verification_code: number = null,
    expiry_datetime: Date = null,
  ) {
    this.email_ver_id = email_ver_id;
    this.Verification_code = Verification_code;
    this.expiry_datetime = expiry_datetime;
  }
}
