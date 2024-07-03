import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Diner } from "./Diners";

@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datetime: string;

  @Column()
  partySize: number;

  @Column()
  restaurantId: number;

  @ManyToMany(() => Diner, (diner) => diner.reservations)
  @JoinTable({
    name: "diner_reservations",
    joinColumn: {
      name: "reservation_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "diner_id",
      referencedColumnName: "id",
    },
  })
  diners: Diner[];
}
