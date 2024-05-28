import { Utilizador } from '@src/resources/utilizador/entities/utilizador.entity';
import { IsBoolean, IsInt, IsTimeZone, Max, Min } from 'class-validator';

export class CreateEmailverificationDto {
  @IsInt()
  email_ver_id: number;

  @IsInt()
  Verification_code: number;

  @IsTimeZone()
  expiry_datetime: Date;
  
  @IsBoolean()
  verified: Boolean;

  utilizador: Utilizador; 
}
