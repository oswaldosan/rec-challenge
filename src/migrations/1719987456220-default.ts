import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719987456220 implements MigrationInterface {
    name = 'Default1719987456220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reservations" ("id" SERIAL NOT NULL, "datetime" character varying NOT NULL, "partySize" integer NOT NULL, "restaurantId" integer NOT NULL, CONSTRAINT "PK_da95cef71b617ac35dc5bcda243" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "diner_reservations" ("diner_id" integer NOT NULL, "reservation_id" integer NOT NULL, CONSTRAINT "PK_214d4430a3084ed0f914cbfe604" PRIMARY KEY ("diner_id", "reservation_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78b24e0cac5fbe4b2df63c66fc" ON "diner_reservations" ("diner_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2f2c5401bc424e335400d65ea2" ON "diner_reservations" ("reservation_id") `);
        await queryRunner.query(`ALTER TABLE "diner_reservations" ADD CONSTRAINT "FK_78b24e0cac5fbe4b2df63c66fc0" FOREIGN KEY ("diner_id") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" ADD CONSTRAINT "FK_2f2c5401bc424e335400d65ea26" FOREIGN KEY ("reservation_id") REFERENCES "diners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diner_reservations" DROP CONSTRAINT "FK_2f2c5401bc424e335400d65ea26"`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" DROP CONSTRAINT "FK_78b24e0cac5fbe4b2df63c66fc0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2f2c5401bc424e335400d65ea2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78b24e0cac5fbe4b2df63c66fc"`);
        await queryRunner.query(`DROP TABLE "diner_reservations"`);
        await queryRunner.query(`DROP TABLE "reservations"`);
    }

}
