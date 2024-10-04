import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) { }

  getHello(): string {
    return 'Hello World!';
  }

  getDatabaseName(): string {
    return this.connection.options.database as string;
  }

  // switchDatabase() {
  //    this.connection.destroy;
  //    this.connection.i
  // }
}
