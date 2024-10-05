import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

@Injectable()
export class DynamicDatabaseService {
    private readonly database_list: string[];
    private activeDataSource: DataSource;

    constructor(private readonly configService: ConfigService) {
        this.database_list = [
            this.configService.getOrThrow("DATABASE_NAME1"),
            this.configService.getOrThrow("DATABASE_NAME2"),
        ];
    }

    getDatabaseList(): string[] {
        return this.database_list;
    }

    getCurrentDatabase(): string {
        // Memastikan activeDataSource sudah diinisialisasi sebelum mengakses options
        if (!this.activeDataSource) {
            throw new Error("No active database connection");
        }
        return this.activeDataSource.options.database as string; // Mengembalikan nama database aktif
    }



}
