import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  position: string;
}
