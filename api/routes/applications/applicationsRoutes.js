import express from "express";
const router = express.Router();

// Controllers
import {
    createDeliveryApplicationController,
    getAllDeliveryApplicationsController,
    getDeliveryApplicationByApplicationIdController,
    getDeliveryApplicationsController,
    updateStatusDeliveryApplicationController,
} from "../../controllers/applications/deliveryApplicationsController.js";

router.post("/deliveries", createDeliveryApplicationController);
router.get("/deliveries/by-user/:id", getDeliveryApplicationsController);
router.get("/deliveries/:id", getDeliveryApplicationByApplicationIdController);
router.get("/deliveries", getAllDeliveryApplicationsController);
router.patch("/deliveries/:id/status", updateStatusDeliveryApplicationController);

export default router;
