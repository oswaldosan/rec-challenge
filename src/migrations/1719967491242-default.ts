import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719967491242 implements MigrationInterface {
    name = 'Default1719967491242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endorsements" ("id" SERIAL NOT NULL, "glutenFree" boolean NOT NULL DEFAULT false, "vegetarian" boolean NOT NULL DEFAULT false, "vegan" boolean NOT NULL DEFAULT false, "paleo" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c7a21592bc1b39fabf5ba56f738" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurants" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "noOfTwoTop" integer NOT NULL, "noOfFourTop" integer NOT NULL, "noOfSixTop" integer NOT NULL, CONSTRAINT "PK_e2133a72eb1cc8f588f7b503e68" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant_endorsements" ("endorsement_id" integer NOT NULL, "restaurant_id" integer NOT NULL, CONSTRAINT "PK_4888d3e015a3b7d8bfa522436a8" PRIMARY KEY ("endorsement_id", "restaurant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5260d4de63a1e767f2f076088c" ON "restaurant_endorsements" ("endorsement_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_08d01c955e6418f39d05b0b7c2" ON "restaurant_endorsements" ("restaurant_id") `);
        await queryRunner.query(`ALTER TABLE "restaurant_endorsements" ADD CONSTRAINT "FK_5260d4de63a1e767f2f076088c2" FOREIGN KEY ("endorsement_id") REFERENCES "endorsements"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurant_endorsements" ADD CONSTRAINT "FK_08d01c955e6418f39d05b0b7c20" FOREIGN KEY ("restaurant_id") REFERENCES "restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant_endorsements" DROP CONSTRAINT "FK_08d01c955e6418f39d05b0b7c20"`);
        await queryRunner.query(`ALTER TABLE "restaurant_endorsements" DROP CONSTRAINT "FK_5260d4de63a1e767f2f076088c2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08d01c955e6418f39d05b0b7c2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5260d4de63a1e767f2f076088c"`);
        await queryRunner.query(`DROP TABLE "restaurant_endorsements"`);
        await queryRunner.query(`DROP TABLE "restaurants"`);
        await queryRunner.query(`DROP TABLE "endorsements"`);
    }

}
