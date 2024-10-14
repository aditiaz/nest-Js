import { Controller, Post, Body, Param, Get, HttpStatus, Res } from '@nestjs/common';
import { DynamicEndPointsService } from './dynamic.endpoints.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { ResponseDto } from 'src/response_dto/response.dto';
import { Response } from 'express';

@Controller('dynamic_endpoints')
export class DynamicEndPointsController {
    constructor(private readonly dynamicEndpointsService: DynamicEndPointsService) { }


    @Post()
    async create(
        @Body() createPetDto: CreatePetDto
    ) {
        return this.dynamicEndpointsService.create(createPetDto);
    }


    @Get(':db_name/:table_name')
    async findAll(
        @Param('db_name') dbname: string,
        @Param('table_name') table_name: string,
        @Res() res: Response) {
        const dbList = this.dynamicEndpointsService.getDatabaseList();
        const dbExists = dbList.includes(dbname);
        let errorMessage: string;

        try {
            if (!dbExists) {
                errorMessage = 'Database yang dimasukkan tidak ada';
                const response1 = new ResponseDto({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: true,
                    message: [`Gagal mendapatkan data pada database : ${dbname} : `, errorMessage],
                    data: null
                });
                return res.status(response1.status).json(response1); // Menghentikan eksekusi dengan return setelah mengirim response
            }

            // Set datasource dan ambil data jika database ada
            this.dynamicEndpointsService.setDataSource(dbname);
            const data = await this.dynamicEndpointsService.findAll(table_name);
            const response = new ResponseDto({
                status: HttpStatus.OK,
                error: false,
                data: data
            });
            return res.status(response.status).json(response); // Mengirim response data
        } catch (error) {
            // Tangani error
            const response = new ResponseDto({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: true,
                message: [`Gagal mendapatkan data pada database : ${dbname} : `, errorMessage],
                data: null
            });
            return res.status(response.status).json(response); // Pastikan hanya ada satu response
        }
    }


    @Get(':db_name')
    async findTables(
        @Param('db_name') db_name: string,
        @Res() res: Response
    ) {
        const dbList = this.dynamicEndpointsService.getDatabaseList();
        const dbExists = dbList.includes(db_name);
        let errorMessage: string;
        try {
            if (!dbExists) {
                errorMessage = 'Database yang dimasukkan tidak ada';
                const response1 = new ResponseDto({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: true,
                    message: [`Gagal mendapatkan data pada database : ${db_name} : `, errorMessage],
                    data: null
                });
                return res.status(response1.status).json(response1); // Menghentikan eksekusi dengan return setelah mengirim response
            }

            // Set datasource dan ambil data jika database ada
            this.dynamicEndpointsService.setDataSource(db_name);
            const data = await this.dynamicEndpointsService.findTables();
            const response = new ResponseDto({
                status: HttpStatus.OK,
                error: false,
                data: data
            });
            return res.status(response.status).json(response); // Mengirim response data
        } catch (error) {
            // Tangani error
            const response = new ResponseDto({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: true,
                message: [`Gagal mendapatkan data pada database : ${db_name} : `, errorMessage],
                data: null
            });
            return res.status(response.status).json(response); // Pastikan hanya ada satu response
        }

    }
}
