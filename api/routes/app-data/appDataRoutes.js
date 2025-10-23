import express from "express";
const router = express.Router();

// Controllers
import { getAppDataController, createAppDataController, updateAppDataController } from "../../controllers/app-data/appDataController.js";

router.get("/", getAppDataController);
router.post("/", createAppDataController);
router.put("/", updateAppDataController);

export default router;
