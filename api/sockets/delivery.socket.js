export const deliverySocket = (io, socket) => {
    socket.on("sendDeliveryOrder", (data) => {
        const { orderId, deliveryOrderId } = data;

        io.emit("newDeliveryOrder", {
            orderId,
            deliveryOrderId,
            created_at: new Date(),
        });
    });
};
