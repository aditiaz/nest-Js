import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class DynamicEndPointsService {
    private currentDataSource: DataSource;
    private readonly database_list: string[];


    constructor(
        @InjectDataSource('nest_j') private readonly nestJDataSource: DataSource,
        @InjectDataSource('adit') private readonly aditDataSource: DataSource,
        private readonly configService: ConfigService
    ) {
        // Set data source default
        this.currentDataSource = this.nestJDataSource;
        this.database_list = [
            this.configService.getOrThrow("DATABASE_NAME1"),
            this.configService.getOrThrow("DATABASE_NAME2"),
        ];
    }

    // Method untuk mengganti DataSource secara dinamis
    setDataSource(dbName: string) {
        if (dbName === 'nest_j') {
            this.currentDataSource = this.nestJDataSource;
        } else if (dbName === 'adit') {
            this.currentDataSource = this.aditDataSource;
        }
    }



    getDatabaseList(): string[] {
        return this.database_list;
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

    async findAll(table_name: string): Promise<any[]> {
        const queryRunner = this.currentDataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const result = await queryRunner.query(`SELECT * FROM public.${table_name}`);
            await queryRunner.release();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    }


    async findTables(): Promise<any[]> {
        const queryRunner = this.currentDataSource.createQueryRunner()
        await queryRunner.connect();
        try {
            const result = await queryRunner.query(
                `SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public';`);
            await queryRunner.release();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }

    }

}

