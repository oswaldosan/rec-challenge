import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Restaurant } from "./Restaurants";
import { Diner } from "./Diners";

@Entity("endorsements")
export class Endorsement {
  @PrimaryGeneratedColumn()
  id: number;

  //type to be unique
  @Column({ unique: true })
  type: string;

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.endorsements)
  @JoinTable({
    name: "restaurant_endorsements",
    joinColumn: {
      name: "endorsement_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "restaurant_id",
      referencedColumnName: "id",
    },
  })
  restaurants: Restaurant[];

  @ManyToMany(() => Diner, (diner) => diner.endorsements)
  @JoinTable({
    name: "diner_endorsements",
    joinColumn: {
      name: "endorsement_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "diner_id",
      referencedColumnName: "id",
    },
  })
  diners: Diner[];
}
