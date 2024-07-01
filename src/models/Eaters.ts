import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Endorsements } from "./Endorsments";

Entity();
export class Eaters {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column((type) => Endorsements)
  dietRestrictions!: Endorsements;
}
