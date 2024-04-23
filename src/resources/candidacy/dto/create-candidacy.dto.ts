import { IsInt, Min } from "class-validator";

export class CreateCandidacyDto {
    @IsInt()
    @Min(1)
    Candidacy_id: number;
}
