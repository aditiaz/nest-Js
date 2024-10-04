import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TableService {
    constructor(private dataSource: DataSource) { }

    async getTableNames(): Promise<string[]> {
        const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;

        const tables = await this.dataSource.query(query);
        return tables.map((table: { table_name: string }) => table.table_name);
    }
}
