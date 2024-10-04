import { Injectable } from "@nestjs/common";
import { CreatePetDto } from "./dto/create-pet.dto";
import { EntityManager, Repository } from "typeorm";
import { Pet } from "./entities/pet.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class  PetService {
    constructor(
        @InjectRepository(Pet)       
        private readonly petRepository:Repository<Pet>,
    ){}


 async create(createPetDto:CreatePetDto):Promise<Pet>{
         const pet = this.petRepository.create(createPetDto)
     return  await this.petRepository.save(pet);
    }


    
}