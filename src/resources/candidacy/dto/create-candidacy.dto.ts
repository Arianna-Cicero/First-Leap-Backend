import { IsInt, IsString, Min } from "class-validator";
import { CreateSelectionprocessDto } from 'src/resources/selection_process/dto/create-selection_process.dto';

export class CreateCandidacyDto {
    @IsInt()
    @Min(1)
    Candidacy_id: number;

    @IsString()
    @Min(1)
    status: string;
    
    selectionProcess: CreateSelectionprocessDto;
}