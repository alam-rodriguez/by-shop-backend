import express from "express";
const router = express.Router();

// Controllers
import {
    changeSlugCategoryDirectController,
    changeStatusCategoryDirectController,
    createCategoryDirectController,
    getCategoriesDirectsController,
    updateCategoryDirectController,
} from "../../controllers/categories/categoriesController.js";

router.get("/", getCategoriesIndirectsController);
router.post("/", createCategoryIndirectController);
router.put("/:id", updateCategoryIndirectController);
router.patch("/change-slug/:id", changeSlugCategoryIndirectController);
router.patch("/change-status/:id", changeStatusCategoryIndirectController);

export default router;
