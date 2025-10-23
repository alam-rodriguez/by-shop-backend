// Models
import { createArticleSpec, deleteArticleSpec, getArticleSpecs, updateArticleSpec } from "../../models/articles/articlesSpecs.js";

export const createArticleSpecController = async (req, res) => {
    try {
        const { id, id_article, id_option, id_value, is_spec, is_measurement, is_highlight, status } = req.body;
        const articleSpec = await createArticleSpec(id, id_article, id_option, id_value, is_spec, is_measurement, is_highlight, status);
        if (articleSpec) res.status(201).json({ message: "Article Spec Created", data: req.body });
        else res.json({ message: "Article Spec Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const updateArticleSpecController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { id_article, id_option, id_value, status, type } = req.body;
//         const articleSpec = await updateArticleSpec(id, id_article, id_option, id_value, status, type);
//         if (articleSpec) res.json({ message: "Article Spec Update", data: req.body });
//         else res.status(404).json({ message: "Articles Spec Not Found", data: {} });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };
export const updateArticleSpecController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_option, id_value, is_spec, is_measurement, is_highlight } = req.body;
        const articleSpec = await updateArticleSpec(id, id_option, id_value, is_spec, is_measurement, is_highlight);
        if (articleSpec) res.json({ message: "Article Spec Update", data: req.body });
        else res.json({ message: "Articles Spec Not Found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteArticleSpecController = async (req, res) => {
    try {
        const idSpec = req.params.id_spec;
        const articleSpec = await deleteArticleSpec(idSpec);
        if (articleSpec) res.json({ message: "Article Spec Deleted", data: {} });
        else res.json({ message: "Articles Spec Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleSpecsController = async (req, res) => {
    try {
        const idArticle = req.params.id_article;
        const articleSpecs = await getArticleSpecs(idArticle);
        if (articleSpecs.length > 0) res.json({ message: "Article Spec Founds", data: articleSpecs });
        else res.json({ message: "Articles Spec Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
