import { chatSocket } from "./chat.socket.js";
import { deliverySocket } from "./delivery.socket.js";

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Cliente conectado:", socket.id);

        // Registrar módulo de chat
        chatSocket(io, socket);

        deliverySocket(io, socket);

        // Aquí puedes registrar otros sockets
        // notificationsSocket(io, socket);
        // ordersSocket(io, socket);
    });
};
