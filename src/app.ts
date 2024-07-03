import express from "express";
import cors from "cors";
import routes from "./routes";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
  .then(() => {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api", routes);

    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the data source:", error);
    process.exit(1);
  });
