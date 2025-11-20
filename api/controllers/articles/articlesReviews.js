import { getArticleReviewUser } from "../../models/carts/cartsModel.js";

export const getArticleReviewUserController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const idArticle = req.params.id_article;
        const lastCartItemBought = await getArticleReviewUser(idUser, idArticle);
        if (lastCartItemBought.length > 0) res.json({ data: lastCartItemBought[0], message: "Last Cart Item Bought Fount" });
        else res.json({ data: null, message: "Last Cart Item Bought Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
