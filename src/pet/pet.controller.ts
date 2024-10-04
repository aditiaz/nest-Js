import { Controller, Post, Body, HttpStatus, Res } from "@nestjs/common";
import { PetService } from "./pet.service";
import { CreatePetDto } from "./dto/create-pet.dto";
import { ResponseDto } from "src/response_dto/response.dto";
import { Response } from 'express';

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Post()
    async create(@Body() createPetDto: CreatePetDto, @Res() res: Response): Promise<void> {
        try {
            const pet = await this.petService.create(createPetDto);
            const response = new ResponseDto({
                status: HttpStatus.CREATED,
                error: false,
                message: ["Peliharaan berhasil ditambahkan"],
                data: pet,
            });
            res.status(response.status).json(response);
        } catch (error) {
            const response = new ResponseDto({
                status: HttpStatus.BAD_REQUEST,
                error: true,
                message: ["Terjadi kesalahan saat menambahkan peliharaan", error.message],
                data: null,
            });
            res.status(response.status).json(response);
        }
    }
}
