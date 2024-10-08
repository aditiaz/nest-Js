import { IsInstance, IsInt, IsString } from "class-validator";

export class CreatePetDto {
    @IsString()
    pet_name: string;

    @IsString()
    owner_name: string;

    @IsInt()
    age: number
}