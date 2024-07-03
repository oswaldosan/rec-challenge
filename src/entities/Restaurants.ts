import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Endorsement } from "./Endorsements";

@Entity("restaurants")
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: "int" })
  noOfTwoTop: number;

  @Column({ type: "int" })
  noOfFourTop: number;

  @Column({ type: "int" })
  noOfSixTop: number;

  @ManyToMany(() => Endorsement, (endorsement) => endorsement.restaurants)
  endorsements: Endorsement[];
}
