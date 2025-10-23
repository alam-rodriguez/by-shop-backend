// Express
import express from "express";
const router = express.Router();

// Controllers
import { getCurrenciesController, createCurrencyController, updateCurrencyController, getCurrenciesByIdController, getCurrenciesForCustomersController, canMakeCurrencyMainCurrencyController } from "../../controllers/currencies/currenciesController.js";

router.get("/", getCurrenciesController);
router.get("/for-customers", getCurrenciesForCustomersController);
router.get("/can-be-main-currency/:id", canMakeCurrencyMainCurrencyController);
router.get("/:id", getCurrenciesByIdController);
router.post("/", createCurrencyController);
router.put("/:id", updateCurrencyController);

export default router;
