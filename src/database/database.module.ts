import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import dotenv from "dotenv";

dotenv.config()

console.log(String(process.env.DATABASE_PASSWORD))
console.log(process.env.USER_NAME)
console.log(process.env.DATABASE_NAME1)

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.HOST,
            port: +process.env.PORT,
            username: process.env.USER_NAME,
            password: String(process.env.DATABASE_PASSWORD),
            database: process.env.DATABASE_NAME1
        }),

        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.HOST,
            port: +process.env.PORT,
            username: process.env.USER_NAME,
            password: String(process.env.DATABASE_PASSWORD),
            database: process.env.DATABASE_NAME2
        })
        ,

    ],
})

export class DataBaseModule { }