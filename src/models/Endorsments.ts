import { Column, Entity } from "typeorm";

Entity();
export class Endorsements {
  @Column({ default: false })
  glutenFree: boolean = false;

  @Column({ default: false })
  vegetarian: boolean = false;

  @Column({ default: false })
  vegan: boolean = false;

  @Column({ default: false })
  paleo: boolean = false;
}
