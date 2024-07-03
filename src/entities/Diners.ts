import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Endorsement } from "./Endorsements";

@Entity("diners")
export class Diner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Endorsement, (endorsement) => endorsement.diners)
  endorsements: Endorsement[];
}
