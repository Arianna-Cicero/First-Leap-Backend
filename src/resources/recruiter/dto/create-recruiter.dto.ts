import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateRecruiterDto {
    @IsInt()
    @Min(1)
    recruiter_id : number;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    name : string;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    position: string;
}
