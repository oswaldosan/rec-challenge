import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Endorsements } from "./Endorsments";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "int" })
  noOfTwoTop!: number;

  @Column({ type: "int" })
  noOfFourTop!: number;

  @Column({ type: "int" })
  noOfSixTop!: number;

  @Column((type) => Endorsements)
  endorsements!: Endorsements;
}
