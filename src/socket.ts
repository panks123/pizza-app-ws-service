import { createServer } from "node:http";
import { Server } from "socket.io";
import logger from "./config/logger";

const wsServer = createServer();

const io = new Server(wsServer, { cors: { origin: "http://localhost:5173" } });

io.on("connection", (socket) => {
    logger.info("Client connected", socket.id);

    socket.on("join", (data) => {
        socket.join(String(data.tenantId));

        socket.emit("join", { roomId: String(data.tenantId) });
    })
});

export default {
    wsServer,
    io,
};