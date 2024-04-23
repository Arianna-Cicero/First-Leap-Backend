import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreatePostalCodeDto {
    @IsInt()
    @Min(1)    
    pc : number;

    @IsString()
    @MinLength(1)
    @MaxLength(50)    
    localidade : string;
}
