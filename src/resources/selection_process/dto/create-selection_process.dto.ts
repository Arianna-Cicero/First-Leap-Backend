import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
import { CreateSelectionphaseDto } from 'src/resources/selection_phase/dto/create-selection_phase.dto';

export class CreateSelectionprocessDto {
    @IsInt()
    SP_id : number;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    description: string;

    @IsInt()
    vacancies: number;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    phase: string;

    // @IsInt()
    // Recruiterrecruiter_id:number

    // @IsInt()
    // Vacancyvacancy_id:number

    // selectionPhase: CreateSelectionphaseDto;

}
