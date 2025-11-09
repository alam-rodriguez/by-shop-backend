import express from "express";
const router = express.Router();

// Controllers
import {
    checkIfDeliveryCanGetOrderController,
    createDeliveryOrderController,
    createDeliveryOrderPreferenceController,
    getDeliveriesOrdersController,
    getDeliveriesOrdersHistoryDeliveryUserIdController,
    getDeliveryOrderByIdController,
    getDeliveryOrderExistsController,
    getDeliveryOrderPreferenceController,
    updateDeliveryOrderPreferenceController,
    updateDeliveryOrderStatusController,
} from "../../controllers/delivery/DeliveryController.js";

router.post("/", createDeliveryOrderController);
router.get("/", getDeliveriesOrdersController);
router.get("/:id", getDeliveryOrderByIdController);
router.patch("/update-status/:id", updateDeliveryOrderStatusController);
router.get("/order-exists/:id_cart_bouth", getDeliveryOrderExistsController);
router.get("/history-by-delivery-user/:delivery_user_id", getDeliveriesOrdersHistoryDeliveryUserIdController);
// router.patch("/update-delivery-order-delivery-id/:id", updateDeliveryOrderDeliveryIdController);

router.post("/order-preference", createDeliveryOrderPreferenceController);
router.get("/order-preference/:id_delivery/:delivery_order_id", getDeliveryOrderPreferenceController);
router.patch("/order-preference/:id", updateDeliveryOrderPreferenceController);
router.get("/delivery-can-get-order/:delivery_order_id/:delivery_id", checkIfDeliveryCanGetOrderController);

export default router;
