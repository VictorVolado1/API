import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    name: string
    
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    @Matches(/^(?!\s*$).+/, { 
        message: 'Descripcion invalida.',
    })
    description: string

}