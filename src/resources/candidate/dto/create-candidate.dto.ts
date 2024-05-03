import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateCandidateDto {
    @IsInt()
    @Min(1)
    candidate_id : number;

    cv : Blob; // Não sei se funciona

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    skills : string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    experience : string;
    

    @IsInt()
    UtilizadorUser_Id : number;

    @IsInt()
    Vacancyvacancy_id : number;
}
