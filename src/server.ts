// src/server.ts
import http from "http";
import app from "./app";

const PORT = process.env.PORT || 3000;

app.set("port", PORT);

const server = http.createServer(app);

server.listen(PORT);

server.on("listening", () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
