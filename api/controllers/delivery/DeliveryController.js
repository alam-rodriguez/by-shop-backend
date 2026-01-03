import {
    createDeliveryOrder,
    createDeliveryOrderPreference,
    getDeliveriesOrders,
    getDeliveriesOrdersHistoryDeliveryUserId,
    getDeliveryOrderById,
    getDeliveryOrderExists,
    getDeliveryOrderPreference,
    getDeliveryOrdersByPeriod,
    updateDeliveryOrderDeliveryId,
    updateDeliveryOrderPreference,
    updateDeliveryOrderStatus,
} from "../../models/delivery/deliveryModel.js";

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

export const getDeliveriesOrdersHistoryDeliveryUserIdController = async (req, res) => {
    try {
        const deliveryUserId = req.params.delivery_user_id;
        const deliveriesOrders = await getDeliveriesOrdersHistoryDeliveryUserId(deliveryUserId);
        if (deliveriesOrders.length > 0) return res.json({ message: "Deliveries Orders Founds", data: deliveriesOrders });
        else return res.json({ message: "Delivery Order Not Created", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDeliveryOrderByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const deliveriesOrders = await getDeliveryOrderById(id);
        if (deliveriesOrders.length > 0) return res.status(201).json({ message: "Delivery Order Found", data: deliveriesOrders[0] });
        else return res.json({ message: "Delivery Order Not Found", data: null });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateDeliveryOrderStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const result = await updateDeliveryOrderStatus(id, status);
        if (result) return res.json({ message: "Delivery Order Status Updated", data: req.body });
        else return res.json({ message: "Delivery Order Status Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDeliveryOrderExistsController = async (req, res) => {
    try {
        const idCartBouth = req.params.id_cart_bouth;
        const exists = await getDeliveryOrderExists(idCartBouth);
        return res.json({ message: "Deliveries Orders Exists", data: null, exists });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createDeliveryOrderPreferenceController = async (req, res) => {
    try {
        const { id, id_delivery, delivery_order_id, status } = req.body;
        const result = await createDeliveryOrderPreference(id, id_delivery, delivery_order_id, status);
        const result2 = await updateDeliveryOrderDeliveryId(id_delivery, status, delivery_order_id);
        if (result && result2) return res.status(201).json({ message: "Delivery Order Preference Created", data: req.body });
        else return res.json({ message: "Delivery Order Preference Not Created", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const updateDeliveryOrderDeliveryIdController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { id_delivery, status } = req.body;
//         const result = await updateDeliveryOrderDeliveryId(id_delivery, status, id);
//         if (result) return res.json({ message: "Delivery Order Updated", data: req.body });
//         else return res.json({ message: "Delivery Order Not Updated", data: req.body });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

export const getDeliveryOrderPreferenceController = async (req, res) => {
    try {
        const { id_delivery, delivery_order_id } = req.params;
        const deliveryOrderPreference = await getDeliveryOrderPreference(id_delivery, delivery_order_id);
        if (deliveryOrderPreference.length > 0)
            return res.json({ message: "Delivery Order Preference Found", data: deliveryOrderPreference[0], hasPreference: true });
        else return res.json({ message: "Delivery Order Preference Not Found", data: {}, hasPreference: false });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateDeliveryOrderPreferenceController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const deliveryOrderId = req.body.delivery_order_id;
        const id_delivery = req.body.id_delivery;
        const result = await updateDeliveryOrderPreference(id, status);
        let result2 = true;
        if (status == 0) result2 = await updateDeliveryOrderDeliveryId(null, 1, deliveryOrderId);
        else result2 = await updateDeliveryOrderDeliveryId(id_delivery, 1, deliveryOrderId);
        if (result && result2) return res.json({ message: "Delivery Order Preference Updated", data: req.body });
        else return res.json({ message: "Delivery Order Preference Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const checkIfDeliveryCanGetOrderController = async (req, res) => {
    try {
        const { delivery_order_id, delivery_id } = req.params;
        console.log(delivery_id);
        const result = await getDeliveryOrderById(delivery_order_id);
        if (result.length == 0) return res.json({ message: "Delivery Can Get Order", data: req.body, canGetOrder: true, deliveryId: null });
        console.log(result);
        const idUserDeliveryOrder = result[0].id_delivery;
        console.log(idUserDeliveryOrder);
        console.log(idUserDeliveryOrder != delivery_id);
        if (idUserDeliveryOrder && idUserDeliveryOrder != delivery_id)
            return res.json({ message: "Delivery Cannot Get Order", data: req.body, canGetOrder: false, deliveryId: idUserDeliveryOrder });

        return res.json({ message: "Delivery Can Get Order", data: req.body, canGetOrder: true, deliveryId: idUserDeliveryOrder });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDeliveryOrdersByPeriodController = async (req, res) => {
    try {
        const { delivery_user_id: deliveryUserId, period_id: periodId } = req.params;
        const response = await getDeliveryOrdersByPeriod(deliveryUserId, periodId);
        return res.json({
            data: response,
            message: response.length > 0 ? "Periods Deliviries Found" : "Periods Deliviries Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
