import { Controller, Body, HttpStatus, Res, Get, Param } from "@nestjs/common";
import { DynamicDatabaseService } from "./dynamic.database.service";
import { ResponseDto } from "src/response_dto/response.dto";
import { Response } from "express";


@Controller('database')
export class DynamicDatabaseController {

    constructor(private readonly dynamicDatbaseService: DynamicDatabaseService,) { }

    @Get()
    async findAll(@Res() res: Response): Promise<void> {
        try {
            const databaseList = await this.dynamicDatbaseService.getDatabaseList();
            const response = new ResponseDto({
                status: HttpStatus.OK,
                error: false,
                data: {
                    database_list: databaseList
                }
            })
            res.status(response.status).json(response)
        } catch (error) {
            const response = new ResponseDto({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: true,
                message: ["Gagal mendapatkan daftar database : ", error.message],
                data: null
            })
            res.status(response.status).json(response)
        }
    }




    // @Get('current')
    // getCurrentDatabase() {
    //     // Mengembalikan nama database yang sedang terkoneksi
    //     const initialize = 
    //     const currentDatabase = this.dynamicDatbaseService.getCurrentDatabase();
    //     return { currentDatabase };
    // }

}




// @Get(':connectionName')
// async switchDatabase(@Param('connectionName') connectionName: string) {
//     const connection = await this.dynamicDatbaseService.switchConnection(connectionName);
//     if (connection.isInitialized) {
//         return `Connected to database: ${connectionName}`;
//     }
//     return `Failed to connect to database: ${connectionName}`;
// }