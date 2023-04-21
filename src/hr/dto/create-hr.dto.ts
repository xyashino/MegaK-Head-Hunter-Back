import {Contains, IsInt, IsNotEmpty, IsString, Max, Min} from "class-validator";

export class CreateHrDto {
    @Contains('@')
    email:string;

    @IsNotEmpty()
    @IsString()
    fullName:string;

    @IsNotEmpty()
    @IsString()
    company:string;

    @IsInt()
    @Min(1)
    @Max(999)
    maxReservedStudents:number;
}
