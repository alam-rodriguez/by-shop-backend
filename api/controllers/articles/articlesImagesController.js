// Models
import { createArticleGeneralCategory, updateArticleGeneralCategory } from "../../models/articles/articlesGeneralCategoriesModel.js";
import { createArticleImage, deleteArticleImage, updateArticleImage } from "../../models/articles/articlesImagesModel.js";

export const createArticleImageController = async (req, res) => {
    try {
        const { id, id_article, image, status } = req.body;
        const articleImage = await createArticleImage(id, id_article, image, status);
        if (articleImage) res.status(201).json({ message: "Article Image Created", data: req.body });
        else res.json({ message: "Article Image Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const updateArticleImageController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { id_article, image, status } = req.body;
//         const articleGeneralCategory = await updateArticleImage(id, id_article, image, status);
//         if (articleGeneralCategory) res.json({ message: "Article Image Update", data: req.body });
//         else res.status(404).json({ message: "Articles Image Not Found", data: {} });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

export const deleteArticleImageController = async (req, res) => {
    try {
        const id = req.params.id;
        const articleImage = await deleteArticleImage(id);
        if (articleImage) res.json({ message: "Article Image Deleted", data: req.body });
        else res.json({ message: "Articles Image Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateArticleImageController = async (req, res) => {
    try {
        const id = req.params.id;
        const { image } = req.body;
        const articleImage = await updateArticleImage(id, image);
        if (articleImage) res.json({ message: "Article Image Update", data: req.body });
        else res.json({ message: "Article Image Not Updated", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
