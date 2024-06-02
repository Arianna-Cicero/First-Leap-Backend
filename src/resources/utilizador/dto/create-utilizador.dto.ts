import {
  IsDate,
  IsEmail,
  IsString,
  MinLength,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { LoginDto } from 'src/auth/dto/login.dto';

export class CreateUtilizadorDto extends LoginDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(60)
  password: string;

  @IsInt()
  @Min(1)
  number: number;

  @IsEmail()
  email: string;

  @IsDate()
  birth_date: Date;

  verificado?: boolean; // Optional
}
