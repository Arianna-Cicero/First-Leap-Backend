import { IsString, IsInt, Min, MinLength, MaxLength } from 'class-validator';

export class CreateAdminDto {
    
    @IsInt()
    @Min(1)
    admin : number;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    position: string;
}
