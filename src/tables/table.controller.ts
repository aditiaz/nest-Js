import { Controller, Get } from '@nestjs/common';
// import { TableService } from './table.service';
import { TableService } from './table.service';

@Controller('tables')
export class TableController {
    constructor(private readonly tableService: TableService) { }

    @Get()
    async getTables() {
        const tables = await this.tableService.getTableNames();
        return { tables };
    }
}
