import express from "express";
const router = express.Router();

// Controllers
import {
    createCartBuyController,
    createCartBuyItemController,
    createCartController,
    getArticlesOrderedController,
    // getArticlesOrderByIdCartController,
    getCartBoughtController,
    getCartItemOptionsController,
    getCartItemsUserForBuyController,
    getCartItemsUserSavedForLaterController,
    getCartUserArticlesCannotBuyController,
    getCartUserController,
    getLastCartItemBoughtController,
    getOrderByIdCartController,
    getOrderByIdController,
    getOrdersByresponsibleShopController,
    getOrdersController,
    getOrdersFromShopAndOrderController,
    getOrdersFromShopController,
    updateCartBoughtItemStatusController,
    updateCartBoughtStatusController,
    updateCartBoughtStatusImageController,
    updateCartController,
    updateCartItemQuantityController,
    updateCartItemStatusController,
} from "../../controllers/carts/cartsController.js";
import { createCartItemOptionController, updateCartItemOptionController } from "../../controllers/carts/cartsController.js";

router.get("/orders", getOrdersController);
router.get("/orders/responsible-shop/:id_shop", getOrdersByresponsibleShopController);

router.get("/orders/shop/:id_shop", getOrdersFromShopController);
router.get("/orders/shop/:id_shop/:id_order", getOrdersFromShopAndOrderController);
router.get("/orders/:id_order", getOrderByIdController);

router.post("/", createCartController);
router.put("/:id", updateCartController);

router.post("/items-options", createCartItemOptionController);
router.get("/items-options/:id_cart", getCartItemOptionsController);
router.put("/items-options/:id", updateCartItemOptionController);

router.get("/:id", getCartUserController);
router.get("/:id/cannot-buy", getCartUserArticlesCannotBuyController);

router.get("/saved-for-later/:id", getCartItemsUserSavedForLaterController);
router.get("/ready-to-buy/:id", getCartItemsUserForBuyController);

router.put("/set-item-status/:id", updateCartItemStatusController);
router.put("/set-item-quantity/:id", updateCartItemQuantityController);

router.post("/buy", createCartBuyController);
router.post("/buy-item", createCartBuyItemController);

router.get("/boughts/:id", getCartBoughtController);

router.get("/boughts/last-cart-item/:id_user/:id_article", getLastCartItemBoughtController);
router.put("/boughts/set-item-status/:id", updateCartBoughtItemStatusController);

router.patch("/boughts/set-status-image/:id", updateCartBoughtStatusImageController);

router.patch("/boughts/set-status/:id", updateCartBoughtStatusController);

router.get("/order-by-id-cart/:id_cart", getOrderByIdCartController);

router.get("/boughts/search-articles/:id_user/:word", getArticlesOrderedController);

export default router;
