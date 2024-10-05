import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PetService } from './pet.service';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { GlobalVariableService } from 'src/helper/globalVar';

@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService, private readonly globalVar: GlobalVariableService) { }


    @Post()
    async create(
        @Body() createPetDto: CreatePetDto
    ) {
        // Ganti DataSource berdasarkan dbName

        // if (this.globalVar.getVariable() === "" || undefined || null) {
        //     this.petService.setDataSource('nest_j');
        // }
        if (this.globalVar.getVariable() === 'nest_j') {
            this.petService.setDataSource(this.globalVar.getVariable());
        } else if (this.globalVar.getVariable() === 'adit') {
            this.petService.setDataSource(this.globalVar.getVariable());
        }

        return this.petService.create(createPetDto);
    }

    @Get()
    async findAll() {

        // if (this.globalVar.getVariable() === "" || undefined || null) {
        //     this.petService.setDataSource('nest_j');
        // }
        if (this.globalVar.getVariable() === 'nest_j') {
            this.petService.setDataSource(this.globalVar.getVariable());
        } else if (this.globalVar.getVariable() === 'adit') {
            this.petService.setDataSource(this.globalVar.getVariable());
        }
        return this.petService.findAll()
    }
}
