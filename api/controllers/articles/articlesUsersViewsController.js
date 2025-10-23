// Models
import { createUserArticleView, getUserArticlesViews } from "../../models/articles/articlesUsersViewsModel.js";

export const createUserArticleViewController = async (req, res) => {
    try {
        const { id, id_user, id_article, id_article_direct_category } = req.body;
        const userArticleView = await createUserArticleView(id, id_user, id_article, id_article_direct_category);
        if (userArticleView) res.status(201).json({ message: "Article User View Created", data: req.body });
        else res.json({ message: "Article User View Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getUserArticlesViewsController = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const userArticlesView = await getUserArticlesViews(id_user);
        if (userArticlesView.length > 0) res.status(200).json({ message: "User Articles Views Founds", data: userArticlesView });
        else res.json({ message: "User Articles Views Not Founds", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
