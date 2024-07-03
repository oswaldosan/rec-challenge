import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Restaurant } from "../entities/Restaurants";
import { Diner } from "../entities/Diners";
import { In, MoreThan } from "typeorm";
import endorsementArrayCleanup from "../utils/filterEndorsementArray";
import axios from "axios";

const restaurantRepository = AppDataSource.getRepository(Restaurant);
const dinerRepository = AppDataSource.getRepository(Diner);

// Get restaurant match
export const getMatch = async (req: Request, res: Response): Promise<void> => {
  const { users, datetime } = req.body;

  if (!users || !datetime) {
    res.status(400).send("Missing required fields");
    return;
  }

  try {
    const matchUser = await dinerRepository.find({
      where: {
        name: In(users),
      },
      relations: ["endorsements"],
    });

    if (matchUser.length != users.length) {
      res.status(404).send("Some users not found");
      return;
    }

    const totalUsers = matchUser.length;
    const jsDate = new Date(datetime).toISOString();

    const endorsementIds = matchUser.flatMap((user) =>
      user.endorsements.map((endorsement) => endorsement.id)
    );

    const usersEndorsementMatch = endorsementArrayCleanup(endorsementIds);

    let tableQuery;
    switch (totalUsers) {
      case 1:
      case 2: {
        tableQuery = { noOfTwoTop: MoreThan(0) };
        break;
      }
      case 3:
      case 4: {
        tableQuery = { noOfFourTop: MoreThan(0) };
        break;
      }
      case 5:
      case 6: {
        tableQuery = { noOfSixTop: MoreThan(0) };
        break;
      }
      default: {
        res.status(400).send("Too many users");
        return;
      }
    }

    const restaurants = await restaurantRepository.find({
      where: {
        ...tableQuery,
        endorsements: {
          id: In(usersEndorsementMatch),
        },
      },
      relations: ["endorsements"],
    });

    if (restaurants.length === 0) {
      res.status(404).send("No match found");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.API_URL}api/reservation/create/`,
        { totalUsers, restaurant: restaurants[0], matchUser, datetime }
      );

      res.status(200).send(response.data);
    } catch (error) {
      console.error("Error calling createReservation:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).send("Internal Server Error");
  }
};
