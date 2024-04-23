import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateJobtypeDto {
    @IsInt()
    @Min(1)
    type_id: number;
    
    @IsString()
    @MinLength(1)
    @MaxLength(250)
    jobtype_desc: string;
}
