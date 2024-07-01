// src/app.ts
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";
import { connectToDatabase } from "./config/database";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the database
connectToDatabase();

// Define routes
app.use("/api", routes);

export default app;
