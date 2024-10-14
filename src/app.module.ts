import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import "reflect-metadata"
import { DynamicEndPointsModule } from './dynamic_enpoints/dynamic.endpoints.module';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { DynamicEndPointsService } from './dynamic_enpoints/dynamic.endpoints.service';
import { DataBaseModule } from './database/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DynamicEndPointsModule,
    DataBaseModule
  ],

  exports: [],
  controllers: [AppController],
  providers: [AppService, RequestService, DynamicEndPointsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: '/dynamic_endpoints', method: RequestMethod.GET, },
        { path: '/dynamic_endpoints/:db_name', method: RequestMethod.GET, },
        { path: '/dynamic_endpoints/:db_name/:table_name', method: RequestMethod.GET, }
      );
  }
}

