import express from "express";
const router = express.Router();

// Controllers
import {
    createShopController,
    getShopsByIdController,
    getShopsController,
    getShopsForCartController,
    updateShopController,
    updateStatusShopController,
} from "../../controllers/shops/shopsController.js";

router.get("/", getShopsController);
router.post("/", createShopController);
router.put("/:id", updateShopController);
router.patch("/:id", updateStatusShopController);
router.get("/:id", getShopsByIdController);

router.get("/for-cart-user/:id_user", getShopsForCartController);

export default router;
