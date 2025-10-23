import express from "express";
const router = express.Router();

// Controllers
import { 
  createOfferController, createOfferCategoryController, 
  createOfferArticleController, createOfferArticleOptionController, 
  getOffersController, getOfferController, 
  updateOfferController, updateOfferCategoryController, 
  updateOfferArticleController, updateOfferArticleOptionController, 
  deleteOfferCategoryController,
  deleteOfferArticleController
} from "../../controllers/offers/offersController.js";

router.post("/", createOfferController);
router.put("/:id", updateOfferController);  

router.post("/categories", createOfferCategoryController);
router.put("/categories/:id", updateOfferCategoryController);
router.delete("/categories/:id_offer/:id_category", deleteOfferCategoryController);

router.post("/articles", createOfferArticleController);
router.put("/articles/:id", updateOfferArticleController);
router.delete("/articles/:id_offer/:id_article", deleteOfferArticleController);

router.post("/articles-options", createOfferArticleOptionController);
router.put("/articles-options/:id", updateOfferArticleOptionController);

router.get("/", getOffersController);
router.get("/:id", getOfferController);

export default router;
