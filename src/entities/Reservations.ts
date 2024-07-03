import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

Entity("reservations");
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  time!: string;

  @Column()
  partySize!: number;

  @Column()
  restaurantId!: number;

  @Column()
  eaterId!: number;
}
