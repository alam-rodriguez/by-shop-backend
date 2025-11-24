import express from "express";
const router = express.Router();

// Controllers
import {
    addArticleToListUsetController,
    articleFinderController,
    changeArticleQuantityController,
    checkArticlesIsInListController,
    createArticleController,
    getArticleByIdCartController,
    getArticleByIdController,
    getArticleByIdForAppController,
    getArticleFeaturedSpecsByIdForAppController,
    getArticleMeasurementsByIdForAppController,
    getArticleOfferController,
    getArticleOptionsByIdForAppController,
    getArticlesByShopIdController,
    getArticlesCanBeInterestedController,
    getArticlesController,
    getArticlesFromDirectCategoriesForAppController,
    getArticlesFromGeneralCategoryForAppController,
    getArticlesFromHomeCategoryForAppController,
    getArticlesFromShopController,
    getArticlesInUserListController,
    getArticlesOfGeneralCategoryGroupForAppController,
    getArticlesOtherImagesController,
    getArticleSpecsByIdForAppController,
    getArticlesSimilarController,
    getArticleWithOfferController,
    getBoxContentArticleController,
    updateArticleController,
    updateArticlesInListStatusController,
} from "../../controllers/articles/articlesController.js";
import {
    createArticleGeneralCategoryController,
    deleteArticleGeneralCategoryController,
    updateArticleGeneralCategoryController,
} from "../../controllers/articles/articlesGeneralCategoriesController.js";

import {
    createArticleBoxContentController,
    deleteArticleBoxContentController,
    getArticlesForBoxContentController,
    updateArticleBoxContentController,
} from "../../controllers/articles/articlesBoxContentsController.js";
import {
    createArticleImageController,
    deleteArticleImageController,
    updateArticleImageController,
} from "../../controllers/articles/articlesImagesController.js";

import {
    createArticleOptionController,
    deleteArticleOptionController,
    getArticleOptionsController,
    updateArticleOptionController,
} from "../../controllers/articles/articlesOptionsController.js";
import {
    createArticleSpecController,
    deleteArticleSpecController,
    getArticleSpecsController,
    updateArticleSpecController,
} from "../../controllers/articles/articlesSpecsController.js";
import { createArticleMeasurement, updateArticleMeasurement } from "../../models/articles/articlesMeasurementsModel.js";
import { createArticleHighlightedParagraph, updateArticleHighlightedParagraph } from "../../models/articles/articleHighlightedParagraphs.js";
import {
    createArticleHighlightedParagraphController,
    deleteArticleHighlightedParagraphController,
    getArticleHighlightedParagraphsController,
    updateArticleHighlightedParagraphController,
} from "../../controllers/articles/articlesHighlightedParagraphsController.js";
import { createUserArticleViewController, getUserArticlesViewsController } from "../../controllers/articles/articlesUsersViewsController.js";
import {
    createArticleReviewController,
    createArticleReviewImageController,
    createArticleReviewOptionController,
    getArticleReviewsByUserDataController,
    getArticleReviewsController,
    getRequestsReviewsByShopController,
    getRequestsReviewsController,
    getReviewByIdController,
    updateReviewStatusController,
} from "../../controllers/articles/articlesViewsController.js";
import { getArticlesOrderByIdCartController } from "../../controllers/articles/articlesCarts.js";
import { getArticleReviewUserController } from "../../controllers/articles/articlesReviews.js";

// TODO: HACER ENDPOINT PARA CAMBIAR LA CANTIDAD DE UN ARTICULOS DISPONLIBLES

router.get("/", getArticlesController);
router.get("/shop/:id", getArticlesFromShopController);
// router.get("/:id", getArticleByIdController);
router.post("/", createArticleController);
router.put("/:id", updateArticleController);

router.patch("/change-quantity/:id", changeArticleQuantityController);

// Reviews
router.post("/reviews", createArticleReviewController);
router.post("/reviews-article-options", createArticleReviewOptionController);
router.post("/reviews-images", createArticleReviewImageController);
router.get("/reviews/:id_article", getArticleReviewsController);
router.get("/reviews-article-data/:id_article", getArticleReviewsByUserDataController);
router.get("/review-user/:id_user/:id_article", getArticleReviewUserController);

router.get("/requests-reviews-articles", getRequestsReviewsController);
router.get("/requests-reviews-articles/:id_shop", getRequestsReviewsByShopController);

router.get("/review-article/:id", getReviewByIdController);
router.patch("/change-review-status/:id", updateReviewStatusController);

router.get("/is-in-list", checkArticlesIsInListController);

router.post("/general-categories", createArticleGeneralCategoryController);
router.put("/general-categories/:id", updateArticleGeneralCategoryController);
router.delete("/general-categories/:id_article/:id_general_category", deleteArticleGeneralCategoryController);

router.get("/box-contents/:id_shop/:id_article", getArticlesForBoxContentController);
router.post("/box-contents", createArticleBoxContentController);
router.put("/box-contents/:id", updateArticleBoxContentController);
router.delete("/box-contents/:id_article/:id_article_box_content", deleteArticleBoxContentController);

router.post("/images", createArticleImageController);
// router.put("/images/:id", updateArticleImageController);
router.patch("/images/:id", updateArticleImageController);

router.delete("/images/:id", deleteArticleImageController);

router.post("/options", createArticleOptionController);
router.put("/options/:id", updateArticleOptionController);
router.get("/options/:id_article", getArticleOptionsController);
router.delete("/options/:id_article_option", deleteArticleOptionController);

router.post("/specs", createArticleSpecController);
router.put("/specs/:id", updateArticleSpecController);
router.delete("/specs/:id_spec", deleteArticleSpecController);
// router.get("/specs/:id_article", getArticleSpecsController);

router.get("/get-articles-group-category/:id", getArticlesOfGeneralCategoryGroupForAppController);
router.get("/:id", getArticleByIdForAppController);
router.get("/:id/offer", getArticleOfferController);
router.get("/:id_cart_item/offer/:id_offer", getArticleWithOfferController);

router.get("/options/:id", getArticleOptionsByIdForAppController);

router.get("/box-contents/:id", getBoxContentArticleController);

router.get("/specs/:id", getArticleSpecsByIdForAppController);
router.get("/featured-specs/:id", getArticleFeaturedSpecsByIdForAppController);
router.get("/measurements/:id", getArticleMeasurementsByIdForAppController);

router.post("/measurements", createArticleMeasurement);
router.put("/measurements/:id", updateArticleMeasurement);

router.post("/highlighted-paragraphs", createArticleHighlightedParagraphController);
router.put("/highlighted-paragraphs/:id", updateArticleHighlightedParagraphController);
router.delete("/highlighted-paragraphs/:id", deleteArticleHighlightedParagraphController);
router.get("/highlighted-paragraphs/:id_article", getArticleHighlightedParagraphsController);

router.post("/list", addArticleToListUsetController);

router.patch("/set-list-status/:id", updateArticlesInListStatusController);

router.get("/list-user/:id", getArticlesInUserListController);

router.get("/get-articles-from-direct-category/:id", getArticlesFromDirectCategoriesForAppController);
router.get("/get-articles-from-general-category/:id_category", getArticlesFromGeneralCategoryForAppController);
router.get("/get-articles-from-home-category/:home_category_id", getArticlesFromHomeCategoryForAppController);

router.get("/get-articles-can-be-interested/:id_article", getArticlesCanBeInterestedController);

router.get("/get-articles-similar/:id_article", getArticlesSimilarController);

router.get("/articles-other-images/:id_article", getArticlesOtherImagesController);

// router.get("/get-articles-from-general-category-without-article/:id_category/:id_article", getArticlesFromGeneralCategoryWithoutArticleController);

router.post("/user-views", createUserArticleViewController);
router.get("/user-views/:id_user", getUserArticlesViewsController);

router.get("/buscardor/:word", articleFinderController);

router.get("/id-cart/:id_cart", getArticleByIdCartController);

router.get("/articles-order-by-id-cart/:id_cart", getArticlesOrderByIdCartController);

router.get("/by-id-shop/:id_shop", getArticlesByShopIdController);

export default router;
