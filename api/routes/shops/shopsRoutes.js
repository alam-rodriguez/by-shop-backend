import express from "express";
const router = express.Router();

// Controllers
import {
    createShopController,
    getShopsByIdController,
    getShopsController,
    getShopsForCartBoughtController,
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
router.get("/for-cart-bought/:id_cart_bought", getShopsForCartBoughtController);

export default router;
