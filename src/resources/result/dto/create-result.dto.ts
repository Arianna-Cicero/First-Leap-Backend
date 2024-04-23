import { IsString, IsInt, Min, MinLength, MaxLength, IsDate } from 'class-validator';
export class CreateResultDto {
    @IsInt()
    @Min(1)
    result_id: number;
    
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    result_desc: string;

    @IsString()
    @MinLength(1)
    @MaxLength(255)
    comments: string;

    @IsDate()
    evaluation_date: Date;
}
