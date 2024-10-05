import { Get, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(@InjectDataSource('adit') private dataSource: DataSource) { }


  getHello(): string {
    return 'Hello World!';
  }
  getDatabaseName(): string {
    return this.dataSource.options.database as string;
  }
}
