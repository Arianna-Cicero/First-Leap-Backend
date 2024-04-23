import { IsInt, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateAddressDto {
    @IsInt()
    @Min(1)
    address_id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    street: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    city: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    state: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    country: string;
}
