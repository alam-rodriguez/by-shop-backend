// Models
import {
    createArticleReview,
    createArticleReviewImage,
    createArticleReviewOption,
    getArticleReviews,
    getArticleReviewsByUserData,
    getRequestsReviews,
    getRequestsReviewsByShop,
    getReviewById,
    updateReviewStatus,
} from "../../models/articles/articlesReviewsModel.js";

export const createArticleReviewController = async (req, res) => {
    try {
        const { id, id_user, id_article, user_public_name, title, rating, comment, status } = req.body;
        const articleReview = await createArticleReview(id, id_user, id_article, user_public_name, title, rating, comment, status);
        if (articleReview) res.status(201).json({ message: "Article Review Created", data: req.body });
        else res.json({ message: "Article Review Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createArticleReviewOptionController = async (req, res) => {
    try {
        const { id, id_review, id_option, id_value, status } = req.body;
        const articleReviewOption = await createArticleReviewOption(id, id_review, id_option, id_value, status);
        if (articleReviewOption) res.status(201).json({ message: "Article Review Option Created", data: req.body });
        else res.json({ message: "Article Review Option Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createArticleReviewImageController = async (req, res) => {
    try {
        const { id, id_review, image, status } = req.body;
        const articleReviewImage = await createArticleReviewImage(id, id_review, image, status);
        if (articleReviewImage) res.status(201).json({ message: "Article Review Image Created", data: req.body });
        else res.json({ message: "Article Review Image Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleReviewsController = async (req, res) => {
    try {
        const { id_article } = req.params;
        const articleReviews = await getArticleReviews(id_article);
        if (articleReviews.length > 0) res.status(201).json({ message: "Article Reviews Found", data: articleReviews });
        else res.json({ message: "Article Reviews Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleReviewsByUserDataController = async (req, res) => {
    try {
        const { id_article } = req.params;
        const articleReviewsData = await getArticleReviewsByUserData(id_article);
        if (articleReviewsData.length > 0) res.status(201).json({ message: "Article Reviews Data Found", data: articleReviewsData[0] });
        else res.json({ message: "Article Reviews Data Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getRequestsReviewsController = async (req, res) => {
    try {
        const articlesRequetsReviews = await getRequestsReviews();
        if (articlesRequetsReviews.length > 0) res.status(201).json({ message: "Articles Requests Reviews Found", data: articlesRequetsReviews });
        else res.json({ message: "Articles Requests Reviews Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getRequestsReviewsByShopController = async (req, res) => {
    try {
        const idShop = req.params.id_shop;
        const articlesRequetsReviews = await getRequestsReviewsByShop(idShop);
        if (articlesRequetsReviews.length > 0) res.status(201).json({ message: "Articles Requests Reviews Found", data: articlesRequetsReviews });
        else res.json({ message: "Articles Requests Reviews Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getReviewByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleReview = await getReviewById(id);
        if (articleReview.length > 0) res.status(201).json({ message: "Article Review Found", data: articleReview[0] });
        else res.json({ message: "Article Review Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateReviewStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const articleReviewStatusChanged = await updateReviewStatus(id, status);
        if (articleReviewStatusChanged) res.status(200).json({ message: "Article Review Status Updated", data: req.body });
        else res.json({ message: "Article Review Status Not Updated", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
