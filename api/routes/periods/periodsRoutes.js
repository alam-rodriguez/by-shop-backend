import express from "express";
const router = express.Router();

// Controllers
import { createPeriodController, getPeriodActiveController } from "../../controllers/periods/periodsControllers.js";
// import {
//     createSearchHistoryController,
//     getSearchHistoryByIdUserController,
//     updateSearchHistoryStatusController,
// } from "../../controllers/search-history/searchHistoryController.js";

// router.get("/:id_user", getSearchHistoryByIdUserController);
router.post("/", createPeriodController);
router.get("/active", getPeriodActiveController);

// router.patch("/update-status/:id", updateSearchHistoryStatusController);

export default router;
