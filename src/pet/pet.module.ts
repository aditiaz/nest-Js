import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { DataBaseModule } from 'src/database/database.module';
import { GlobalVariableService } from 'src/helper/globalVar';
@Module({
  imports: [
    DataBaseModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [PetController],
  providers: [PetService, GlobalVariableService],
})
export class PetModule { }
