import { IsDate, IsEmail, IsNumber, IsString, MinLength, IsInt, Min, MaxLength } from "class-validator";

export class CreateUtilizadorDto {
    @IsInt()
    @Min(1)
    User_id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name : string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    username : string;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    password : string;

    @IsInt()
    @Min(1)
    permisson : number;

    @IsInt()
    @Min(1)
    number : number;

    @IsEmail()
    email : string;

    @IsDate()
    birth_date : Date;
}
