import { IsBoolean, IsNotEmpty, IsNumber, MinLength } from "class-validator";

export class UpdateTaskdto{

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean

}