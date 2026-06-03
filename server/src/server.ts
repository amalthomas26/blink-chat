import "./config/dotenv";
import http from "http";

import app from "./app";
import { connectDB } from "./config/db";
import { initSocket } from "./socket/socket.server";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);
  const io = initSocket(server);

  const gracefulShutdown = (signal: string) => {
    console.log(`Received ${signal}. Closing server gracefully...`);
    io.close(() => {
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
  };

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(PORT, () => {
      server.off("error", reject);
      console.log(`Server running on port ${PORT}`);
      resolve();
    });
  });
};

startServer().catch((error) => {
  console.error("Server bootstrap failed", error);
  process.exit(1);
});
