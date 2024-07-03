import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719972446335 implements MigrationInterface {
    name = 'Default1719972446335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "diners" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a203b912ab496c209d0bf91ad3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diner_endorsements" ("endorsement_id" integer NOT NULL, "diner_id" integer NOT NULL, CONSTRAINT "PK_ee99b33c79cde79b6266741fee3" PRIMARY KEY ("endorsement_id", "diner_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9168d5faa00eed2547437cb6a9" ON "diner_endorsements" ("endorsement_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_644a100fb53e2da797acc870cd" ON "diner_endorsements" ("diner_id") `);
        await queryRunner.query(`ALTER TABLE "diner_endorsements" ADD CONSTRAINT "FK_9168d5faa00eed2547437cb6a97" FOREIGN KEY ("endorsement_id") REFERENCES "endorsements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "diner_endorsements" ADD CONSTRAINT "FK_644a100fb53e2da797acc870cda" FOREIGN KEY ("diner_id") REFERENCES "diners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diner_endorsements" DROP CONSTRAINT "FK_644a100fb53e2da797acc870cda"`);
        await queryRunner.query(`ALTER TABLE "diner_endorsements" DROP CONSTRAINT "FK_9168d5faa00eed2547437cb6a97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_644a100fb53e2da797acc870cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9168d5faa00eed2547437cb6a9"`);
        await queryRunner.query(`DROP TABLE "diner_endorsements"`);
        await queryRunner.query(`DROP TABLE "diners"`);
    }

}
