import { IsInt, IsString } from 'class-validator';

export class CreateTypeSelectionProcessDto {
  @IsInt()
  type_sp_id: number;

  @IsString()
  description: string;
}
