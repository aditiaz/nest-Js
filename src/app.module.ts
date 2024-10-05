import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import "reflect-metadata"
import { DataBaseModule } from './database/database.module';
import { PetModule } from './pet/pet.module';
import { DynamicDatabaseModule } from './dynamic_endpoints/dynamic_database/dynamic.database.module';
import { SwitchDbMiddleware } from './middleware/switchDatabase';
// import { SwitchDbController } from './middleware/switchDatabase.controller';
import { GlobalVariableService } from './helper/globalVar';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataBaseModule,
    PetModule,
    DynamicDatabaseModule,
  ],

  exports: [],
  controllers: [AppController],
  providers: [AppService, GlobalVariableService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SwitchDbMiddleware)
      .forRoutes('/database/switch/:dbName');
  }
}

