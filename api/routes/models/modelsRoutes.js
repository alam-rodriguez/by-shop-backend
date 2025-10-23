import express from "express";
const router = express.Router();

// Controllers
import {
    getModelsController,
    createModelController,
    updateModelController,
    getModelByIdController,
} from "../../controllers/models/modelsController.js";

router.get("/", getModelsController);
router.get("/:id", getModelByIdController);

router.post("/", createModelController);
router.put("/:id", updateModelController);

export default router;
