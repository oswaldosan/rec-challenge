import { Entity } from "typeorm";

Entity();
export class Reservations {
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
