import { createDeliveryOrder, getDeliveriesOrders } from "../../models/delivery/deliveryModel.js";

export const createDeliveryOrderController = async (req, res) => {
    try {
        const { id, id_delivery, id_cart_bouth, price, status } = req.body;
        const result = await createDeliveryOrder(id, id_delivery, id_cart_bouth, price, status);
        if (result) return res.status(201).json({ message: "Delivery Order Created", data: req.body });
        else return res.json({ message: "Delivery Order Not Created", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDeliveriesOrdersController = async (req, res) => {
    try {
        const deliveriesOrders = await getDeliveriesOrders();
        if (deliveriesOrders.length > 0) return res.status(201).json({ message: "Deliveries Orders Founds", data: deliveriesOrders });
        else return res.json({ message: "Delivery Order Not Created", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
