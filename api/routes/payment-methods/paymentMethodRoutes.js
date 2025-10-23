import express from "express";
const router = express.Router();

// Controllers
import {
    createPaymentMethodController,
    getPaymentMethodByIdController,
    getPaymentMethodsController,
    updatePaymentMethodController,
} from "../../controllers/payment-methods/paymentMethodsController.js";

router.get("/", getPaymentMethodsController);
router.get("/:id", getPaymentMethodByIdController);

router.post("/", createPaymentMethodController);
router.put("/:id", updatePaymentMethodController);

export default router;
