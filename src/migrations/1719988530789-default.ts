import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1719988530789 implements MigrationInterface {
    name = 'Default1719988530789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diner_reservations" DROP CONSTRAINT "FK_78b24e0cac5fbe4b2df63c66fc0"`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" DROP CONSTRAINT "FK_2f2c5401bc424e335400d65ea26"`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" ADD CONSTRAINT "FK_2f2c5401bc424e335400d65ea26" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" ADD CONSTRAINT "FK_78b24e0cac5fbe4b2df63c66fc0" FOREIGN KEY ("diner_id") REFERENCES "diners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "diner_reservations" DROP CONSTRAINT "FK_78b24e0cac5fbe4b2df63c66fc0"`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" DROP CONSTRAINT "FK_2f2c5401bc424e335400d65ea26"`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" ADD CONSTRAINT "FK_2f2c5401bc424e335400d65ea26" FOREIGN KEY ("reservation_id") REFERENCES "diners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diner_reservations" ADD CONSTRAINT "FK_78b24e0cac5fbe4b2df63c66fc0" FOREIGN KEY ("diner_id") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
