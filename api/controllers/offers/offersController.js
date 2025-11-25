// Models
import {
    createOffer,
    createOfferArticle,
    createOfferArticleOption,
    createOfferCategory,
    getOffer,
    getOffers,
    updateOffer,
    updateOfferArticle,
    updateOfferCategory,
    updateOfferArticleOption,
    deleteOfferCategory,
    deleteOfferArticle,
    getOffersByShopId,
} from "../../models/offers/offersModel.js";

export const getOffersController = async (req, res) => {
    try {
        const offers = await getOffers();
        if (offers.length > 0) res.status(200).json({ message: "Offers Found", data: offers });
        else res.json({ message: "Offers Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOffersByShopIdController = async (req, res) => {
    try {
        const { shop_id } = req.params;
        const offers = await getOffersByShopId(shop_id);
        if (offers.length > 0) res.status(200).json({ message: "Offers Found", data: offers });
        else res.json({ message: "Offers Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOfferController = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await getOffer(id);
        if (offer.length > 0) res.status(200).json({ message: "Offer Found", data: offer[0] });
        else res.json({ message: "Offer Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createOfferController = async (req, res) => {
    try {
        const { id, shop_id, name, description, percent_discount, image, date_start, date_end, status } = req.body;
        const offer = await createOffer(id, shop_id, name, description, percent_discount, image, date_start, date_end, status);
        if (offer) res.status(201).json({ message: "Offer Created", data: req.body });
        else res.json({ message: "Offer Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateOfferController = async (req, res) => {
    try {
        const { id } = req.params;
        const { shop_id, name, description, percent_discount, image, date_start, date_end, status } = req.body;
        const offer = await updateOffer(id, shop_id, name, description, percent_discount, image, date_start, date_end, status);
        if (offer) res.status(200).json({ message: "Offer Updated", data: req.body });
        else res.json({ message: "Offer Not Updated", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createOfferCategoryController = async (req, res) => {
    try {
        const { id, id_offer, id_category, type_category, percent_discount, status } = req.body;
        const offerCategory = await createOfferCategory(id, id_offer, id_category, type_category, percent_discount, status);
        if (offerCategory) res.status(201).json({ message: "Offer Category Created", data: req.body });
        else res.json({ message: "Offer Category Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateOfferCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_offer, id_category, type_category, percent_discount, status } = req.body;
        const offerCategory = await updateOfferCategory(id, id_offer, id_category, type_category, percent_discount, status);
        if (offerCategory) res.status(200).json({ message: "Offer Category Updated", data: req.body });
        else res.json({ message: "Offer Category Not Updated", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteOfferCategoryController = async (req, res) => {
    try {
        const { id_offer, id_category } = req.params;
        const offerCategory = await deleteOfferCategory(id_offer, id_category);
        if (offerCategory) res.status(200).json({ message: "Offer Category Deleted", data: req.body });
        else res.json({ message: "Offer Category Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createOfferArticleController = async (req, res) => {
    try {
        const { id, id_offer, id_article, percent_discount, price, status } = req.body;
        const offerArticle = await createOfferArticle(id, id_offer, id_article, percent_discount, price, status);
        if (offerArticle) res.status(201).json({ message: "Offer Article Created", data: req.body });
        else res.json({ message: "Offer Article Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateOfferArticleController = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_offer, id_article, percent_discount, price, status } = req.body;
        const offerArticle = await updateOfferArticle(id, id_offer, id_article, percent_discount, price, status);
        if (offerArticle) res.status(200).json({ message: "Offer Article Updated", data: req.body });
        else res.json({ message: "Offer Article Not Updated", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteOfferArticleController = async (req, res) => {
    try {
        const { id_offer, id_article } = req.params;
        const offerArticle = await deleteOfferArticle(id_offer, id_article);
        if (offerArticle) res.status(200).json({ message: "Offer Article Deleted", data: req.body });
        else res.json({ message: "Offer Article Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createOfferArticleOptionController = async (req, res) => {
    try {
        const { id, id_offer_article, id_option, id_value, percent_discount, price, status } = req.body;
        const offerArticleOption = await createOfferArticleOption(id, id_offer_article, id_option, id_value, percent_discount, price, status);
        if (offerArticleOption) res.status(201).json({ message: "Offer Article Option Created", data: req.body });
        else res.json({ message: "Offer Article Option Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateOfferArticleOptionController = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_offer_article, id_option, id_value, percent_discount, price, status } = req.body;
        const offerArticleOption = await updateOfferArticleOption(id, id_offer_article, id_option, id_value, percent_discount, price, status);
        if (offerArticleOption) res.status(200).json({ message: "Offer Article Option Updated", data: req.body });
        else res.json({ message: "Offer Article Option Not Updated", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
