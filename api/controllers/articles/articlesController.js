// Models
import {
    addArticleToListUset,
    articleFinder,
    changeArticleQuantity,
    checkArticlesIsInList,
    createArticle,
    getArticleById,
    getArticleByIdCart,
    getArticleByIdForApp,
    getArticleFeaturedSpecsByIdForApp,
    getArticleMeasurementsByIdForApp,
    getArticleOffer,
    getArticleOptionsByIdForApp,
    getArticles,
    getArticlesByShopId,
    getArticlesCanBeInterested,
    getArticlesFromDirectCategoriesForApp,
    getArticlesFromGeneralCategoryForApp,
    getArticlesFromShop,
    getArticlesInUserList,
    getArticlesOfGeneralCategoryGroupForApp,
    getArticlesOtherImages,
    getArticleSpecsByIdForApp,
    getArticlesSimilar,
    getArticleWithOffer,
    getBoxContentArticle,
    updateArticle,
    updateArticlesInListStatus,
} from "../../models/articles/articlesModel.js";

export const getArticlesController = async (req, res) => {
    // console.log("first");
    try {
        const articles = await getArticles();
        if (articles.length > 0) res.json({ message: "Articles Founds", data: articles });
        else res.json({ message: "Articles Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesFromShopController = async (req, res) => {
    try {
        const idShop = req.params.id;
        const articles = await getArticlesFromShop(idShop);
        if (articles.length > 0) res.json({ message: "Articles From Shop Founds", data: articles });
        else res.json({ message: "Articles From Shop Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleByIdController = async (req, res) => {
    // console.log("first");

    try {
        const id = req.params.id;
        const articles = await getArticleById(id);
        if (articles) res.json({ message: "Article Found", data: articles });
        else res.status(404).json({ message: "Article Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createArticleController = async (req, res) => {
    try {
        const {
            id,
            name,
            description,
            slug,
            main_image,
            id_direct_category,
            id_indirect_category,
            id_model,
            id_payment_method,
            status,
            view,
            price,
            quantity,
            id_shop,
            additional_details,
            created_date,
        } = req.body;
        const article = await createArticle(
            id,
            name,
            description,
            slug,
            main_image,
            id_direct_category,
            id_indirect_category,
            id_model,
            id_payment_method,
            status,
            view,
            price,
            quantity,
            id_shop,
            additional_details,
            created_date
        );
        if (article) res.status(201).json({ message: "Article Created", data: req.body });
        else res.json({ message: "Article Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateArticleController = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
            description,
            slug,
            main_image,
            id_direct_category,
            id_indirect_category,
            id_model,
            id_payment_method,
            status,
            view,
            price,
            quantity,
        } = req.body;
        const article = await updateArticle(
            id,
            name,
            description,
            slug,
            main_image,
            id_direct_category,
            id_indirect_category,
            id_model,
            id_payment_method,
            status,
            view,
            price,
            quantity
        );
        if (article) res.json({ message: "Article Update", data: req.body });
        else res.status(404).json({ message: "Articles not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesOfGeneralCategoryGroupForAppController = async (req, res) => {
    // console.log("first");

    try {
        const id = req.params.id;
        const articles = await getArticlesOfGeneralCategoryGroupForApp(id);
        if (articles.length > 0) res.json({ message: "Articles Founds", data: articles });
        else res.json({ message: "Articles Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleByIdForAppController = async (req, res) => {
    console.log("first");

    try {
        const id = req.params.id;
        const article = await getArticleByIdForApp(id);
        if (article.length > 0) res.json({ message: "Article Found", data: article[0] });
        else res.json({ message: "Article Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleOfferController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleOffer = await getArticleOffer(id);
        if (articleOffer.length > 0) res.json({ message: "Article Offer Found", data: articleOffer[0] });
        else res.json({ message: "Article Offer Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleWithOfferController = async (req, res) => {
    try {
        const { id_cart_item, id_offer } = req.params;
        const articleOffer = await getArticleWithOffer(id_cart_item, id_offer);
        if (articleOffer.length > 0) res.json({ message: "Article Offer Found", data: articleOffer[0] });
        else res.json({ message: "Article Offer Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleOptionsByIdForAppController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleOptions = await getArticleOptionsByIdForApp(id);
        if (articleOptions.length) res.json({ message: "Article Options Found", data: articleOptions });
        else res.json({ message: "Article Options Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getBoxContentArticleController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleBoxContent = await getBoxContentArticle(id);
        if (articleBoxContent.length) res.json({ message: "Article Box Content Found", data: articleBoxContent });
        else res.json({ message: "Article Box Content Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleSpecsByIdForAppController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleSpecs = await getArticleSpecsByIdForApp(id);
        if (articleSpecs.length) res.json({ message: "Article Specs Found", data: articleSpecs });
        else res.json({ message: "Article Specs Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleFeaturedSpecsByIdForAppController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleSpecs = await getArticleFeaturedSpecsByIdForApp(id);
        if (articleSpecs.length) res.json({ message: "Article Featured Specs Found", data: articleSpecs });
        else res.json({ message: "Article Featured Specs Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleMeasurementsByIdForAppController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleSpecs = await getArticleMeasurementsByIdForApp(id);
        if (articleSpecs.length) res.json({ message: "Article Measurements Found", data: articleSpecs });
        else res.json({ message: "Article Measurements Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const addArticleToListUsetController = async (req, res) => {
    try {
        const { id, id_user, id_article, status } = req.body;
        const articleList = await addArticleToListUset(id, id_user, id_article, status);
        if (articleList) res.status(201).json({ message: "Article List Created", data: req.body });
        else res.json({ message: "Article List Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const checkArticlesIsInListController = async (req, res) => {
    console.log("first");
    try {
        // const { id_user, id_article } = req.body;
        const { id_user, id_article } = req.query;
        const articleList = await checkArticlesIsInList(id_user, id_article);
        console.log(articleList);
        if (articleList.length > 0) res.status(200).json({ message: "Article Is In List", data: articleList[0] });
        else res.json({ message: "Article Is Not In List", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateArticlesInListStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const articleList = await updateArticlesInListStatus(id, status);
        if (articleList) res.status(200).json({ message: "Article Is In List", data: req.body });
        else res.json({ message: "Article Is Not In List", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesInUserListController = async (req, res) => {
    try {
        const id = req.params.id;
        const articles = await getArticlesInUserList(id);
        if (articles.length > 0) res.json({ message: "List User Founds", data: articles });
        else res.json({ message: "List User Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesFromDirectCategoriesForAppController = async (req, res) => {
    try {
        const id = req.params.id;
        const articles = await getArticlesFromDirectCategoriesForApp(id);
        if (articles.length > 0) res.json({ message: "Articles From Category Founds", data: articles });
        else res.json({ message: "Articles From Category Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const articleFinderController = async (req, res) => {
    try {
        const word = req.params.word;
        const articles = await articleFinder(word);
        if (articles.length > 0) res.json({ message: "Articles Founds", data: articles });
        else res.json({ message: "Articles Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesFromGeneralCategoryForAppController = async (req, res) => {
    try {
        const idCategory = req.params.id_category;
        const articles = await getArticlesFromGeneralCategoryForApp(idCategory);
        if (articles.length > 0) res.json({ message: "Articles From General Category Founds", data: articles });
        else res.json({ message: "Articles From General Category Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const getArticlesFromGeneralCategoryWithoutArticleController = async (req, res) => {
//     try {
//         const idCategory = req.params.id_category;
//         const idArticle = req.params.id_article;
//         const articles = await getArticlesFromGeneralCategoryWithoutArticle(idCategory, idArticle);
//         if (articles.length > 0) res.json({ message: "Articles From General Category Founds", data: articles });
//         else res.json({ message: "Articles From General Category Not Founds", data: [] });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

export const getArticlesCanBeInterestedController = async (req, res) => {
    try {
        const idArticle = req.params.id_article;
        const articles = await getArticlesCanBeInterested(idArticle);
        if (articles.length > 0) res.json({ message: "Articles From General Category Founds", data: articles });
        else res.json({ message: "Articles From General Category Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesSimilarController = async (req, res) => {
    try {
        const idArticle = req.params.id_article;
        const articles = await getArticlesSimilar(idArticle);
        if (articles.length > 0) res.json({ message: "Articles Similar Founds", data: articles });
        else res.json({ message: "Articles Similar Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesOtherImagesController = async (req, res) => {
    try {
        const idArticle = req.params.id_article;
        const articleImages = await getArticlesOtherImages(idArticle);
        if (articleImages.length > 0) res.json({ message: "Article Images Founds", data: articleImages });
        else res.json({ message: "Article Images Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleByIdCartController = async (req, res) => {
    try {
        const idCart = req.params.id_cart;
        const article = await getArticleByIdCart(idCart);
        if (article.length > 0) res.json({ message: "Article Found", data: article[0] });
        else res.json({ message: "Article Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const changeArticleQuantityController = async (req, res) => {
    try {
        const idArticle = req.params.id;
        const quantity = req.body.quantity;
        const action = req.body.action; // 'add' or 'subtract'

        const article = await getArticleById(idArticle);
        if (!article.id) return res.status(400).json({ message: "Article Not Found", data: {} });

        const articleNewQuantity = action === "add" ? article.quantity + quantity : article.quantity - quantity;

        const articleChanged = await changeArticleQuantity(idArticle, articleNewQuantity);
        if (articleChanged) res.json({ message: "Article Quantity Changed", data: {} });
        else res.status(400).json({ message: "Article Quantity Not Changed", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesByShopIdController = async (req, res) => {
    try {
        const idShop = req.params.id_shop;
        const articles = await getArticlesByShopId(idShop);
        if (articles.length > 0) res.json({ message: "Articles Founds", data: articles });
        else res.json({ message: "Articles Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
