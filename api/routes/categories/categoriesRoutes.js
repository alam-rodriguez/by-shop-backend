import express from "express";
const router = express.Router();

// Controllers
import {
    changeSlugCategoryController,
    changeStatusCategoryController,
    createCategoryController,
    createDepartmentController,
    createDirectCategoryDepartamentController,
    deleteDirectCategoryDepartamentController,
    getCategoriesByTypeController,
    getCategoriesController,
    getCategoryByIdController,
    getDepartmentByIdController,
    getDepartmentsController,
    getDirectCategoriesController,
    getDirectCategoriesForAppController,
    getDirectsCategoriesByIdDepartmentController,
    getGeneralCategoriesAndArticlesController,
    getGeneralCategoriesAndCategoriesController,
    getGeneralCategoriesController,
    getGeneralCategoriesOfArticleController,
    getIndirectCategoriesForAppHomeController,
    getIndirectsCategoriesController,
    updateCategoryController,
    updateDepartmentController,
} from "../../controllers/categories/categoriesController.js";
import {
    createGeneralCategoryGroupController,
    getCategoriesOfGeneralCategoryGroupForAppController,
    getGeneralCategoriesGroupsController,
    updateGeneralCategoryGroupController,
} from "../../controllers/categories/generalCategoriesGroupsController.js";
import {
    createGeneralCategoryGroupCategoryController,
    deleteGeneralCategoryGroupCategoryController,
    getGeneralCategoryGroupByIdController,
    updateGeneralCategoryGroupCategoryController,
} from "../../controllers/categories/generalCategoriesGroupsCategoriesController.js";
import {
    createOptionCategoryController,
    getOptionCategoriesController,
    updateOptionCategoryController,
} from "../../controllers/categories/optionCategoriesController.js";

// Controllers for app
import { getGeneralCategoriesGroupsForAppController } from "../../controllers/categories/generalCategoriesGroupsController.js";
import { getDepartmentsForAppController } from "../../controllers/categories/departmentsController.js";

// Departments
router.get("/departments", getDepartmentsController);
router.get("/departments/:id", getDepartmentByIdController);
router.post("/departments", createDepartmentController);
router.put("/departments/:id", updateDepartmentController);

router.post("/direct-category-department", createDirectCategoryDepartamentController);
router.delete("/departments/directs-categories/:id_department/:id_category", deleteDirectCategoryDepartamentController);

router.get("/departments-for-app", getDepartmentsForAppController);

router.get("/by-type", getCategoriesByTypeController);

// /api/categories?type=${type}
router.get("/id/:id", getCategoryByIdController);

router.get("/", getCategoriesController);
router.get("/direct-categories", getDirectCategoriesController);
router.get("/indirect-categories", getIndirectsCategoriesController);
router.get("/general-categories", getGeneralCategoriesController);
router.get("/general-categories-of-articles/:id_article", getGeneralCategoriesOfArticleController);

router.get("/indirect-categories-for-home", getIndirectCategoriesForAppHomeController);

router.post("/", createCategoryController);
router.put("/:id", updateCategoryController);
router.patch("/change-slug/:id", changeSlugCategoryController);
router.patch("/change-status/:id", changeStatusCategoryController);

router.get("/general-categories-groups", getGeneralCategoriesGroupsController);

router.post("/general-categories-groups", createGeneralCategoryGroupController);
router.put("/general-categories-groups/:id", updateGeneralCategoryGroupController);
router.get("/general-categories-groups/:id", getGeneralCategoryGroupByIdController);

router.post("/general-categories-groups-categories", createGeneralCategoryGroupCategoryController);
router.put("/general-categories-groups-categories/:id", updateGeneralCategoryGroupCategoryController);
router.delete("/general-categories-groups-categories/:general_category_group_id/:id_category", deleteGeneralCategoryGroupCategoryController);

router.get("/general-categories-groups-for-app", getGeneralCategoriesGroupsForAppController);
router.get("/categories-of-general-category-group-for-app/:id", getCategoriesOfGeneralCategoryGroupForAppController);

router.get("/direct-categories-for-app", getDirectCategoriesForAppController);

router.get("/general-category-articles", getGeneralCategoriesAndArticlesController);
router.get("/general-category-group-and-categories", getGeneralCategoriesAndCategoriesController);

// Departaments
router.get("/direct-categories-by-department/:id", getDirectsCategoriesByIdDepartmentController);

export default router;
