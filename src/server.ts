import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "socket.io";
import { createServer } from "http";
import handleSocketConnection from "./app/socket";

let io: Server;

async function main() {
  await mongoose.connect(config.database_url as string);
  const server = createServer(app);
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://second-deal-market.vercel.app",
      ],
      credentials: true,
    },
  });
  await handleSocketConnection(io);
  server.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}

export { io };

main();
