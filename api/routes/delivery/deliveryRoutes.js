import express from "express";
const router = express.Router();

// Controllers
import { createDeliveryOrderController, getDeliveriesOrdersController } from "../../controllers/delivery/DeliveryController.js";

router.post("/", createDeliveryOrderController);
router.get("/", getDeliveriesOrdersController);

export default router;
