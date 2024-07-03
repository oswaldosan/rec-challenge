import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Reservation } from "../entities/Reservations";
import { Diner } from "../entities/Diners";

const reservationRepository = AppDataSource.getRepository(Reservation);
const dinerRepository = AppDataSource.getRepository(Diner);

export const getAll = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationRepository.find();
    return res.json(reservations);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  const { totalUsers, restaurant, matchUser, datetime } = req.body;

  if (!totalUsers || !restaurant || !matchUser || !datetime) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const reservation = new Reservation();
    reservation.datetime = datetime;
    reservation.partySize = totalUsers;
    reservation.restaurantId = restaurant.id;
    reservation.diners = [];

    try {
      const dinners = await dinerRepository.find({
        where: {
          id: matchUser.id,
        },
      });
      reservation.diners = dinners;
    } catch (error) {
      return res.status(404).json({ message: "Some users not found" });
    }

    const reservationRes = reservationRepository.save(reservation);
    res.json(reservationRes);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
