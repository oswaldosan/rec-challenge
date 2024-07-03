import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Restaurant } from "../entities/Restaurants";
import { Endorsement } from "../entities/Endorsements";
import { Diner } from "../entities/Diners";

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: port,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "postgres",
  entities: [Restaurant, Endorsement, Diner],
  migrations: ["src/migrations/*.ts"],
});
