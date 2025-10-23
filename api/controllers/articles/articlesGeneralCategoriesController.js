// Models
import { createArticleGeneralCategory, deleteArticleGeneralCategory, updateArticleGeneralCategory } from "../../models/articles/articlesGeneralCategoriesModel.js";

export const createArticleGeneralCategoryController = async (req, res) => {
    try {
        const { id, id_article, id_general_category, status } = req.body;
        const article = await createArticleGeneralCategory(id, id_article, id_general_category, status);
        if (article) res.status(201).json({ message: "Article General Category Created", data: req.body });
        else res.json({ message: "Article General Category Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteArticleGeneralCategoryController = async (req, res) => {
    try {
        const { id_article, id_general_category } = req.params;
        const article = await deleteArticleGeneralCategory(id_article, id_general_category);
        if (article) res.status(201).json({ message: "Article General Category Deleted", data: req.body });
        else res.json({ message: "Article General Category Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateArticleGeneralCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_article, id_general_category, status } = req.body;
        const articleGeneralCategory = await updateArticleGeneralCategory(id, id_article, id_general_category, status);
        if (articleGeneralCategory) res.json({ message: "Article General Category Update", data: req.body });
        else res.status(404).json({ message: "Articles General Category Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
