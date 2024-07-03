import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719977343007 implements MigrationInterface {
    name = 'Default1719977343007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endorsements" DROP COLUMN "glutenFree"`);
        await queryRunner.query(`ALTER TABLE "endorsements" DROP COLUMN "vegetarian"`);
        await queryRunner.query(`ALTER TABLE "endorsements" DROP COLUMN "vegan"`);
        await queryRunner.query(`ALTER TABLE "endorsements" DROP COLUMN "paleo"`);
        await queryRunner.query(`ALTER TABLE "endorsements" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "endorsements" ADD CONSTRAINT "UQ_af74d74e939c96d54b3db41d2be" UNIQUE ("type")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "endorsements" DROP CONSTRAINT "UQ_af74d74e939c96d54b3db41d2be"`);
        await queryRunner.query(`ALTER TABLE "endorsements" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "endorsements" ADD "paleo" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "endorsements" ADD "vegan" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "endorsements" ADD "vegetarian" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "endorsements" ADD "glutenFree" boolean NOT NULL DEFAULT false`);
    }

}
