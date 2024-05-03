import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateFeedbackDto {
    
    @IsInt()
    @Min(1)
    feedback_id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(250)
    feedback_desc: string;

    @IsInt()
    Selection_PhaseSPH_id: number;       

}