import { DataSource } from "typeorm";
import { config } from "dotenv"
import { ConfigService } from "@nestjs/config";

config();
const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('HOST'),
    port: configService.getOrThrow('PORT'),
    username: configService.getOrThrow('USER_NAME'),
    database: configService.getOrThrow('DATABASE_NAME1'),
    password: configService.getOrThrow('DATABASE_PASSWORD'),
    // all the files in this folder will be run as a migration
    migrations: ["migrations/**"],
    // entities: [Pet, User]
})


