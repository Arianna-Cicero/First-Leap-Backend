import { IsInt, IsString } from 'class-validator';

export class CreateWrittenTestDto {
  @IsInt()
  written_test_id: number;

  @IsString()
  question_text: string;

  @IsInt()
  difficulty_level: number;

  @IsString()
  subject_area: string;

  @IsString()
  answer: string;
}
