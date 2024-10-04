import { Module } from '@nestjs/common';
// import { TableService } from './table.service';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/pet/entities/pet.entity';
import { DataBaseModule } from 'src/database/database.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        DataBaseModule],
    providers: [TableService],
    controllers: [TableController],
})

export class TableModule { }
