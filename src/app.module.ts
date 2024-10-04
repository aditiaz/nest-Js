import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import "reflect-metadata"
import { DataBaseModule } from './database/database.module';
import { PetModule } from './pet/pet.module';
import { DynamicDatabaseModule } from './dynamic_endpoints/dynamic_database/dynamic.database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet/entities/pet.entity';
import { TableModule } from './tables/table.module';
import dotenv from "dotenv";

dotenv.config()


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    PetModule,
    DynamicDatabaseModule,
    TableModule,

    // TypeOrmModule.forFeature([Pet], 'adit'),
    // TypeOrmModule.forFeature([Pet], 'nest_j'),

  ],

  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

