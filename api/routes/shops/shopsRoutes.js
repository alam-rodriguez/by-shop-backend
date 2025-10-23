import express from "express";
const router = express.Router();

// Controllers
import {
    createShopController,
    getShopsByIdController,
    getShopsController,
    updateShopController,
    updateStatusShopController,
} from "../../controllers/shops/shopsController.js";

router.get("/", getShopsController);
router.post("/", createShopController);
router.put("/:id", updateShopController);
router.patch("/:id", updateStatusShopController);
router.get("/:id", getShopsByIdController);

export default router;
