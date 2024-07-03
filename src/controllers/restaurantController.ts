// src/controllers/restaurantsController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Restaurant } from "../entities/Restaurants";
import { Diner } from "../entities/Diners";
import { In } from "typeorm";

const restaurantRepository = AppDataSource.getRepository(Restaurant);
const dinerRepository = AppDataSource.getRepository(Diner);

// Get restaurant match
export const getMatch = async (req: Request, res: Response): Promise<void> => {
  const { users, time } = req.body;
  try {
    const matchUser = await dinerRepository.find({
      where: {
        name: In(users),
      },
      relations: ["endorsements"],
    });
    if (matchUser.length === 0) {
      res.status(404).send("No user found");
      return;
    }

    const totalUsers = matchUser.length;
    const jsDate = new Date(time).toISOString();

    const endorsementIds = matchUser.flatMap((user) =>
      user.endorsements.map((endorsement) => endorsement.id)
    );

    const restaurants = await restaurantRepository.find({
      where: {
        endorsements: {
          id: In(endorsementIds),
        },
      },
      relations: ["endorsements"],
    });

    if (restaurants.length === 0) {
      res.status(404).send("No match found");
      return;
    }

    res.json(restaurants);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Internal Server Error");
  }
};
