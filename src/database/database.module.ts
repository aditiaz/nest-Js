import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            name: 'nest_j',
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow('HOST'),
                port: configService.getOrThrow('PORT'),
                username: configService.getOrThrow('USER_NAME'),
                database: configService.getOrThrow('DATABASE_NAME1'),
                password: configService.getOrThrow('DATABASE_PASSWORD'),
                autoLoadEntities: true,
                synchronize: true,
                logging: true
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forRootAsync({
            name: 'adit',
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.getOrThrow('HOST'),
                port: configService.getOrThrow('PORT'),
                username: configService.getOrThrow('USER_NAME'),
                database: configService.getOrThrow('DATABASE_NAME2'),
                password: configService.getOrThrow('DATABASE_PASSWORD'),
                autoLoadEntities: true,
                synchronize: true,
                logging: true
            }),
            inject: [ConfigService]
        }),
    ],

    exports: [TypeOrmModule]
})

export class DataBaseModule { }