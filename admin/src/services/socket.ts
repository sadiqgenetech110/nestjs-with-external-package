// src/lib/socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"], // force websockets
  autoConnect: false,        // connect manually
});

export default socket;
