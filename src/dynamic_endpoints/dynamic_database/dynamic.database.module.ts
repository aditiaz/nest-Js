import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DynamicDatabaseController } from "./dynamic.database.controller";
import { DynamicDatabaseService } from "./dynamic.database.service";
import { ROUTES } from "@nestjs/core/router/router-module";

@Module({
    // imports:[DynamicDatabaseController],
    controllers: [DynamicDatabaseController],
    providers: [DynamicDatabaseService]
})

export class DynamicDatabaseModule { }