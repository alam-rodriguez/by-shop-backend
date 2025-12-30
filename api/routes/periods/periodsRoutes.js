import express from "express";
const router = express.Router();

// Controllers
import {
    createPeriodController,
    createPeriodShopPayoutController,
    getPeriodActiveController,
    getPeriodActiveForAllShopController,
    getPeriodActiveForShopController,
    getPeriodsController,
    getPeriodsForShopController,
    getShopsPeriodActiveController,
    getPeriodByIdController,
    getShopsPeriodsByPeriodIdController,
    getPeriodActiveForAllDeliveriesController,
} from "../../controllers/periods/periodsControllers.js";
// import {
//     createSearchHistoryController,
//     getSearchHistoryByIdUserController,
//     updateSearchHistoryStatusController,
// } from "../../controllers/search-history/searchHistoryController.js";

// router.get("/:id_user", getSearchHistoryByIdUserController);
router.post("/", createPeriodController);

router.get("/active", getPeriodActiveController);
router.get("/active/by-shop/:shop_id", getPeriodActiveForShopController);
router.get("/active/shops", getShopsPeriodActiveController);
router.get("/active/all-shops", getPeriodActiveForAllShopController);
router.post("/payouts/shops", createPeriodShopPayoutController);
router.get("/", getPeriodsController);
router.get("/by-shop/:shop_id", getPeriodsForShopController);
router.get("/:id", getPeriodByIdController);
router.get("/:id/shops", getShopsPeriodsByPeriodIdController);

router.get("/active/all-deliveries", getPeriodActiveForAllDeliveriesController);

// router.patch("/update-status/:id", updateSearchHistoryStatusController);

export default router;
