import express from "express";
const router = express.Router();

// Controllers
import {
    createDeliveryApplicationController,
    getDeliveryApplicationByApplicationIdController,
    getDeliveryApplicationsController,
} from "../../controllers/applications/deliveryApplicationsController.js";

router.post("/deliveries", createDeliveryApplicationController);
router.get("/deliveries/by-user/:id", getDeliveryApplicationsController);
router.get("/deliveries/:id", getDeliveryApplicationByApplicationIdController);

export default router;
