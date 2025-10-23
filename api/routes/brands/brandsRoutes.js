import express from "express";
const router = express.Router();

// Controllers
import {
    createBrandController,
    getBrandByIdController,
    getBrandsController,
    updateBrandController,
} from "../../controllers/brandsController/brandsController.js";

router.get("/", getBrandsController);
router.get("/:id", getBrandByIdController);
router.post("/", createBrandController);
router.put("/:id", updateBrandController);

export default router;
