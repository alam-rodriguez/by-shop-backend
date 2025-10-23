// Next
import express from "express";
const router = express.Router();

// Controllers
import {
    createOptionController,
    getOptionByIdController,
    getOptionsController,
    getValueOptionController,
    updateOptionController,
} from "../../controllers/options/optionsController.js";
import { getValuesOPtionsController, createValueOptionController, updateValueOptionController } from "../../controllers/options/optionsController.js";
import {
    createOptionCategoryController,
    getOptionCategoriesController,
    getOptionCategoryByIdController,
    updateOptionCategoryController,
} from "../../controllers/categories/optionCategoriesController.js";

// Options Values
router.get("/values-options", getValuesOPtionsController);
router.get("/values-options/:id", getValueOptionController);
router.post("/values-options", createValueOptionController);
router.put("/values-options/:id", updateValueOptionController);

// Option Categories
router.get("/option-categories", getOptionCategoriesController);
router.get("/option-categories/:id", getOptionCategoryByIdController);
router.post("/option-categories/:id", createOptionCategoryController);
router.put("/option-categories/:id", updateOptionCategoryController);

// Options
router.get("/", getOptionsController);
router.post("/", createOptionController);
router.put("/:id", updateOptionController);
router.get("/:id", getOptionByIdController);

export default router;
