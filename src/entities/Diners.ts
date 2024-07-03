import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Endorsement } from "./Endorsements";
import { Reservation } from "./Reservations";

@Entity("diners")
export class Diner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Endorsement, (endorsement) => endorsement.diners)
  endorsements: Endorsement[];

  @ManyToMany(() => Reservation, (reservation) => reservation.diners)
  reservations: Reservation[];
}
