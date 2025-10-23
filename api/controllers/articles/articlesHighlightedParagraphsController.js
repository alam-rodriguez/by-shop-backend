// Models
import {
    createArticleHighlightedParagraph,
    deleteArticleHighlightedParagraph,
    getArticleHighlightedParagraphs,
    updateArticleHighlightedParagraph,
} from "../../models/articles/articleHighlightedParagraphs.js";

export const createArticleHighlightedParagraphController = async (req, res) => {
    try {
        const { id, id_article, paragraph, status } = req.body;
        const articleSpec = await createArticleHighlightedParagraph(id, id_article, paragraph, status);
        if (articleSpec) res.status(201).json({ message: "Article Highlighted Paragraph Created", data: req.body });
        else res.json({ message: "Article Highlighted Paragraph Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const updateArticleHighlightedParagraphController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { id_article, paragraph, status } = req.body;
//         const articleSpec = await updateArticleHighlightedParagraph(id, id_article, paragraph, status);
//         if (articleSpec) res.json({ message: "Article Highlighted Paragraph Update", data: req.body });
//         else res.status(404).json({ message: "Articles Highlighted Paragraph Not Found", data: {} });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

export const updateArticleHighlightedParagraphController = async (req, res) => {
    try {
        const id = req.params.id;
        const { paragraph } = req.body;
        const articleHighlightedParagraph = await updateArticleHighlightedParagraph(id, paragraph);
        if (articleHighlightedParagraph) res.json({ message: "Article Highlighted Paragraph Updated", data: req.body });
        else res.json({ message: "Articles Highlighted Paragraph Not Updated", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteArticleHighlightedParagraphController = async (req, res) => {
    try {
        const idArticleHighlightedParagraph = req.params.id;
        const articleHighlightedParagraph = await deleteArticleHighlightedParagraph(idArticleHighlightedParagraph);
        if (articleHighlightedParagraph) res.json({ message: "Article Highlighted Paragraph Deleted", data: {} });
        else res.json({ message: "Articles Highlighted Paragraph Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticleHighlightedParagraphsController = async (req, res) => {
    try {
        const idArticle = req.params.id_article;
        const articleHighlightedParagraphs = await getArticleHighlightedParagraphs(idArticle);
        if (articleHighlightedParagraphs.length > 0)
            res.json({ message: "Article Highlighted Paragraphs Founds", data: articleHighlightedParagraphs });
        else res.json({ message: "Articles Highlighted Paragraphs Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
