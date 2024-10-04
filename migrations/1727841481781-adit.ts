import { MigrationInterface, QueryRunner } from "typeorm";
import { Logger } from "@nestjs/common";

export class Adit1727841481781 implements MigrationInterface {
    private readonly logger = new Logger(Adit1727841481781.name)

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Up');
        await queryRunner.query("ALTER TABLE public.pet ADD COLUMN weight INT;")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
