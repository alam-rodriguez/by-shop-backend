// Requests
import { getArticlesOrderByIdCart } from "../../models/articles/articlesCarts.js";

export const getArticlesOrderByIdCartController = async (req, res) => {
    try {
        const idCart = req.params.id_cart;
        const order = await getArticlesOrderByIdCart(idCart);
        console.log(order);
        if (order.length > 0) res.json({ data: order, message: "Articles Order Found" });
        else res.json({ data: [], message: "Articles Order Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};