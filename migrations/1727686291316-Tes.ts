import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";


export class Tes1727686291316 implements MigrationInterface {

    private readonly logger = new Logger(Tes1727686291316.name)


    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
        await queryRunner.query("ALTER TABLE public.pet ADD COLUMN age INT;")
    }

    public async down(): Promise<void> {
        this.logger.log('Down');
    }

}
