import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class PetService {
    private currentDataSource: DataSource;

    constructor(
        @InjectDataSource('nest_j') private readonly nestJDataSource: DataSource,
        @InjectDataSource('adit') private readonly aditDataSource: DataSource,
    ) {
        // Set data source default
        this.currentDataSource = this.nestJDataSource;
    }

    // Method untuk mengganti DataSource secara dinamis
    setDataSource(dbName: string) {
        if (dbName === 'nest_j') {
            this.currentDataSource = this.nestJDataSource;
        } else if (dbName === 'adit') {
            this.currentDataSource = this.aditDataSource;
        }
    }
    async create(createPetDto: CreatePetDto): Promise<any> {
        const queryRunner = this.currentDataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            await queryRunner.startTransaction();
            const result = await queryRunner.query(
                `INSERT INTO pet (pet_name, owner_name, age) VALUES ($1, $2, $3) RETURNING *`,
                [createPetDto.pet_name, createPetDto.owner_name, createPetDto.age]
            );
            await queryRunner.release();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }

    async findAll(): Promise<any[]> {
        const queryRunner = this.currentDataSource.createQueryRunner();
        await queryRunner.connect();

        console.log('crooooooooooooooot')
        console.log(this.currentDataSource)


        try {
            const result = await queryRunner.query('SELECT * FROM public.pet');
            await queryRunner.release();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }
}
