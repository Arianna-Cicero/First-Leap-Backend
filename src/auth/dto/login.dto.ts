import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @MaxLength(12)
  @MinLength(8)
  password: string;
}
