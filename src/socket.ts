import { createServer } from "node:http";
import { Server } from "socket.io";
import logger from "./config/logger";
import config from "config";

const wsServer = createServer();

const ALLOWED_DOMAINS = [
    config.get("frontend.clientUI"),
    config.get("frontend.adminUI"),
] as string[];

const io = new Server(wsServer, { cors: { origin: ALLOWED_DOMAINS } });

io.on("connection", (socket) => {
    logger.info("Client connected", socket.id);

    socket.on("join", (data) => {
        socket.join(String(data.tenantId));

        console.log("User joined on room:", data.tenantId);

        socket.emit("join", { roomId: String(data.tenantId) });
    })
});

export default {
    wsServer,
    io,
};