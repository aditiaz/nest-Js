import { MigrationInterface, QueryRunner } from "typeorm";

export class Speed1728024489059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // this.logger.log('Up');
        await queryRunner.query("ALTER TABLE public.pet ADD COLUMN sewy VARCHAR(256);")
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
