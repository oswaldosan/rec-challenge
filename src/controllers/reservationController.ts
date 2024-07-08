import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Reservation } from "../entities/Reservations";
import { Diner } from "../entities/Diners";
import axios from "axios";
import { DateTime } from "luxon";
// import { MoreThanOrEqual } from "typeorm";

interface User {
  id: number;
  name: string;
}

const reservationRepository = AppDataSource.getRepository(Reservation);
const dinerRepository = AppDataSource.getRepository(Diner);

//Get All reservations
export const getAll = async (req: Request, res: Response) => {
  try {
    const reservations = await reservationRepository.find();
    return res.json(reservations);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Get single reservations based on id
export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params; // `id` should be the diner's ID
  try {
    const reservations = await reservationRepository.find({
      relations: ["diners"],
      where: {
        diners: {
          id: parseInt(id),
        },
        // datetime: MoreThanOrEqual(new Date().toISOString().split("T")[0]), apply only in future dates
      },
    });
    return res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Create new reservation
export const createReservation = async (req: Request, res: Response) => {
  const { totalUsers, restaurant, matchUser, datetime } = req.body;

  if (!totalUsers || !restaurant || !matchUser || !datetime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let dbDiners = [];

  try {
    const dinerPromises = matchUser.map((user: User) => {
      return dinerRepository.findOne({ where: { id: user.id } });
    });

    // Wait for all promises to resolve
    const diners = await Promise.all(dinerPromises);

    // Check if all diners were found
    if (diners.some((diner) => diner === null)) {
      return res.status(404).json({ message: "Some users not found" });
    }
    dbDiners = diners;
  } catch (error) {
    console.error("Error fetching diners:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  // check user current reservations for each user
  const reservationPromises = dbDiners.map((user: Diner) =>
    axios.get(`${process.env.API_URL}api/reservation/${user.id}`)
  );
  const results = await Promise.all(reservationPromises);
  // Check if any user already has reservations
  const userWithReservations = results.find((res) => res.data.length > 0);
  if (userWithReservations && userWithReservations.data.length > 0) {
    const reservationsArray = userWithReservations.data;
    const sameTimeReservations = [];
    reservationsArray.forEach((reservation: any) => {
      const reservationTime = DateTime.fromISO(reservation.datetime);
      const userReservationTime = DateTime.fromISO(datetime);

      const diff = Math.abs(
        reservationTime.diff(userReservationTime, "hours").hours
      );

      if (diff < 2) {
        sameTimeReservations.push(reservation);
      }
    });

    if (sameTimeReservations.length > 0) {
      return res.json({
        message: "User already has a reservation at this time or 2 hours later",
      });
    }
  }

  try {
    const reservation = new Reservation();
    reservation.datetime = datetime;
    reservation.partySize = totalUsers;
    reservation.restaurantId = restaurant.id;
    reservation.diners = dbDiners as Diner[];
    const reservationRes = await reservationRepository.save(reservation);
    res.json(reservationRes);
  } catch (error) {
    console.error("Error processing reservation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reservation = await reservationRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    await reservationRepository.remove(reservation);
    return res.json({ message: `Reservation ${id} deleted` });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
