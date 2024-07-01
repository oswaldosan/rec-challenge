import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    console.log("Connected to the database");

    // Here you can start to work with your entities
    const userRepository = connection.getRepository(User);
    const users = await userRepository.find();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process on database connection failure
  });
