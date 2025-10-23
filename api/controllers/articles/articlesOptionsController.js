// Models
import { createArticleOption, deleteArticleOption, getArticleOptions, updateArticleOption } from "../../models/articles/articlesOptions.js";

export const createArticleOptionController = async (req, res) => {
    try {
        const { id, id_article, id_option, id_value, image, price, quantity, color, status } = req.body;
        const articleBoxContent = await createArticleOption(id, id_article, id_option, id_value, image, price, quantity, color, status);
        if (articleBoxContent) res.status(201).json({ message: "Article Option Created", data: req.body });
        else res.json({ message: "Article Option Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const updateArticleOptionController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { id_article, id_option, id_value, image, price, quantity, status } = req.body;
//         const articleBoxContent = await updateArticleOption(id, id_article, id_option, id_value, image, price, quantity, status);
//         if (articleBoxContent) res.json({ message: "Article Option Update", data: req.body });
//         else res.status(404).json({ message: "Articles Option Not Found", data: {} });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };
export const updateArticleOptionController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_value, image, price, quantity, color } = req.body;
        const articleOption = await updateArticleOption(id, id_value, image, price, quantity, color);
        if (articleOption) res.json({ message: "Article Option Update", data: req.body });
        else res.json({ message: "Articles Option Not Update", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleOptionsController = async (req, res) => {
    try {
        const id_article = req.params.id_article;
        const optionsArticle = await getArticleOptions(id_article);
        if (optionsArticle.length > 0) res.json({ message: "Article Options Founds", data: optionsArticle });
        else res.json({ message: "Articles Options Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteArticleOptionController = async (req, res) => {
    try {
        const id_article_option = req.params.id_article_option;
        const optionArticle = await deleteArticleOption(id_article_option);
        if (optionArticle) res.json({ message: "Article Options Deleted", data: {} });
        else res.json({ message: "Articles Options Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
