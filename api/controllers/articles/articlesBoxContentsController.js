// Models
import {
    createArticleBoxContent,
    deleteArticleBoxContent,
    getArticlesForBoxContent,
    updateArticleBoxContent,
} from "../../models/articles/boxContentsModel.js";

export const createArticleBoxContentController = async (req, res) => {
    try {
        const { id, id_article, id_article_content, status } = req.body;
        const articleBoxContent = await createArticleBoxContent(id, id_article, id_article_content, status);
        if (articleBoxContent) res.status(201).json({ message: "Article Box Content Created", data: req.body });
        else res.json({ message: "Article Box Content Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateArticleBoxContentController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_article, id_article_content, status } = req.body;
        const articleBoxContent = await updateArticleBoxContent(id, id_article, id_article_content, status);
        if (articleBoxContent) res.json({ message: "Article Box Content Update", data: req.body });
        else res.status(404).json({ message: "Articles Box Content Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteArticleBoxContentController = async (req, res) => {
    try {
        const { id_article, id_article_box_content } = req.params;
        const articleBoxContent = await deleteArticleBoxContent(id_article, id_article_box_content);
        if (articleBoxContent) res.json({ message: "Article Box Content Deleted", data: req.body });
        else res.status(404).json({ message: "Articles Box Content Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesForBoxContentController = async (req, res) => {
    try {
        const { id_shop, id_article } = req.params;
        const articleBoxContent = await getArticlesForBoxContent(id_shop, id_article);
        if (articleBoxContent.length > 0) res.json({ message: "Article Box Content Founds", data: articleBoxContent });
        else res.json({ message: "Articles Box Content Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
