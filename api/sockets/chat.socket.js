export const chatSocket = (io, socket) => {
    // Usuario se une al chat
    socket.on("joinChat", (chatId) => {
        socket.join(`chat_${chatId}`);
        console.log(`Socket ${socket.id} joined room chat_${chatId}`);
    });

    // Usuario envía mensaje
    socket.on("sendMessage", (data) => {
        const { chatId, senderId, message } = data;

        io.to(`chat_${chatId}`).emit("newMessage", {
            chatId,
            senderId,
            message,
            created_at: new Date(),
        });
    });
};
