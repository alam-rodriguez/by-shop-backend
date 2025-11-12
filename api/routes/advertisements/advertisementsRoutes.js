import express from "express";
const router = express.Router();

// Controllers
import {
    createAdvertisementController,
    getAdvertisementByIdController,
    getAdvertisementsController,
    getAdvertisementsForAppController,
    updateAdvertisementController,
} from "../../controllers/advertisements/advertisementsController.js";

router.get("/for-app", getAdvertisementsForAppController);
router.post("/", createAdvertisementController);
router.put("/:id", updateAdvertisementController);
router.get("/", getAdvertisementsController);
router.get("/:id", getAdvertisementByIdController);

export default router;
