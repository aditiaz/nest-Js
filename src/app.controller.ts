import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('database-name')
  getDatabaseName(): string {
    return this.appService.getDatabaseName();
  }
}




// import { Get, Injectable } from '@nestjs/common';
// import { DataSource } from 'typeorm';
// import { InjectDataSource } from '@nestjs/typeorm';

// @Injectable()
// export class AppService {
//   constructor(@InjectDataSource() private dataSource: DataSource) { }

//   @Get()
//   getHello(): string {
//     return 'Hello World!';
//   }
//   @Get('database-name')
//   getDatabaseName(): string {
//     return this.dataSource.options.database as string;
//   }
// }
