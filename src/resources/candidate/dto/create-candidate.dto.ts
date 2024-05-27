import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';

export class CreateCandidateDto extends Utilizador {
  cv: Buffer;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  skills: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  experience: string;
}
