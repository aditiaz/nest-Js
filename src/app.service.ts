import { Get, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { RequestService } from './request.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)
  constructor(@InjectDataSource('adit') private dataSource: DataSource, private readonly requestService: RequestService) { }


  getHello(): string {
    const userId = this.requestService.getUserId();
    this.logger.log('ada orang ngakunya KANG bikin website 🤣🤣🤣', userId)
    return 'Hello World!';
  }
  getDatabaseName(): string {
    return this.dataSource.options.database as string;
  }
}
