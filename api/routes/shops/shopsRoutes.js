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
import {
    createShopPlanController,
    getShopPlanByIdController,
    getShopsPlansController,
    updateShopPlanController,
} from "../../controllers/shops/shopsPlansController.js";
import {
    createShopCodeController,
    getDataShopCodeController,
    getShopCodeByIdController,
    getShopsCodesController,
    setUseShopCodeController,
    updateShopCodeController,
} from "../../controllers/shops/shopsCodesController.js";

router.get("/plans", getShopsPlansController);
router.get("/plans/:id", getShopPlanByIdController);
router.post("/plans", createShopPlanController);
router.put("/plans/:id", updateShopPlanController);

router.get("/codes", getShopsCodesController);
router.get("/codes/:id", getShopCodeByIdController);
router.post("/codes", createShopCodeController);
router.put("/codes/:id", updateShopCodeController);
router.get("/codes/data/:code", getDataShopCodeController);
router.patch("/codes/set-code-used/:id", setUseShopCodeController);

router.get("/", getShopsController);
router.post("/", createShopController);
router.put("/:id", updateShopController);
router.patch("/:id", updateStatusShopController);
router.get("/:id", getShopsByIdController);

router.get("/for-cart-user/:id_user", getShopsForCartController);
router.get("/for-cart-bought/:id_cart_bought", getShopsForCartBoughtController);

export default router;
