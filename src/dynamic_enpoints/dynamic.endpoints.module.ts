import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicEndPointsService } from './dynamic.endpoints.service';
import { DynamicEndPointsController } from './dynamic.endpoints.controller';
import { DataBaseModule } from 'src/database/database.module';
import { RequestService } from 'src/request.service';
@Module({
  imports: [
    DataBaseModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [DynamicEndPointsController],
  providers: [DynamicEndPointsService, RequestService],
})
export class DynamicEndPointsModule { }
