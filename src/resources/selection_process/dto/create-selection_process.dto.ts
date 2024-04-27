import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateSelectionprocessDto {
    @IsInt()
    SP : number;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    description: string;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    vacancies: string;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    phase: string;

}