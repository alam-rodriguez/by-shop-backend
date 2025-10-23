// Models
import {
    createCart,
    createCartBuy,
    createCartBuyItem,
    getArticlesOrdered,
    // getArticlesOrderByIdCart,
    getCartBought,
    getCartItemOptions,
    getCartItemsUserForBuy,
    getCartItemsUserSavedForLater,
    getCartUser,
    getLastCartItemBought,
    getOrderById,
    getOrderByIdCart,
    getOrders,
    getOrdersFromShop,
    getOrdersFromShopAndOrder,
    updateCart,
    updateCartBoughtItemStatus,
    updateCartBoughtStatus,
    updateCartBoughtStatusImage,
    updateCartItemQuantity,
    updateCartItemStatus,
} from "../../models/carts/cartsModel.js";
import { createCartItemOption, updateCartItemOption } from "../../models/carts/cartsModel.js";

export const createCartController = async (req, res) => {
    try {
        const { id, id_article, id_user, status, quantity } = req.body;
        const cart = await createCart(id, id_article, id_user, status, quantity);
        if (cart == 1) res.status(201).json({ data: req.body, message: "Cart Created" });
        else res.json({ data: req.body, message: "Cart Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCartController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_article, id_user, status, quantity } = req.body;
        const cart = await updateCart(id, id_article, id_user, status, quantity);
        if (cart == 1) res.json({ data: req.body, message: "Cart Updated" });
        else res.json({ data: req.body, message: "Cart Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createCartItemOptionController = async (req, res) => {
    try {
        const { id, id_article, id_user, id_cart, id_article_option, status, id_option, id_value } = req.body;
        const cartItemOption = await createCartItemOption(id, id_article, id_user, id_cart, id_article_option, status, id_option, id_value);
        if (cartItemOption == 1) res.status(201).json({ data: req.body, message: "Cart Item Option Created" });
        else res.json({ data: req.body, message: "Cart Item Option Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const getCartItemOptionsController = async (req, res) => {
    try {
        const idCart = req.params.id_cart;
        const cartItemOption = await getCartItemOptions(idCart);
        if (cartItemOption.length > 0) res.json({ data: cartItemOption, message: "Cart Item Option Fount" });
        else res.json({ data: [], message: "Cart Item Option Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCartItemOptionController = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_article, id_user, status, quantity } = req.body;
        const cartItemOption = await updateCartItemOption(id, id_article, id_user, status, quantity);
        if (cartItemOption == 1) res.json({ data: req.body, message: "Cart Item Option Updated" });
        else res.json({ data: req.body, message: "Cart Item Option Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCartUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await getCartUser(id);
        if (cart.length > 0) res.json({ data: cart, message: "Cart Fount" });
        else res.json({ data: [], message: "Cart Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCartItemStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const cart = await updateCartItemStatus(id, status);
        if (cart > 0) res.json({ data: req.body, message: "Cart Item Status Updated" });
        else res.json({ data: req.body, message: "Cart Item Status Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCartItemQuantityController = async (req, res) => {
    try {
        const id = req.params.id;
        const { quantity } = req.body;
        const cart = await updateCartItemQuantity(id, quantity);
        if (cart > 0) res.json({ data: req.body, message: "Cart Item Quantity Updated" });
        else res.json({ data: req.body, message: "Cart Item Quantity Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCartItemsUserSavedForLaterController = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await getCartItemsUserSavedForLater(id);
        if (cart.length > 0) res.json({ data: cart, message: "Cart Fount" });
        else res.json({ data: [], message: "Cart Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createCartBuyController = async (req, res) => {
    try {
        const { id, id_user, status, id_pay_method, image, id_currency, want_use_address, id_address } = req.body;
        const cart = await createCartBuy(id, id_user, status, id_pay_method, image, id_currency, want_use_address, id_address);
        if (cart > 0) res.status(201).json({ data: req.body, message: "Cart Buy Created" });
        else res.json({ data: req.body, message: "Cart Buy Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createCartBuyItemController = async (req, res) => {
    try {
        const {
            id,
            id_cart_bought,
            id_cart,
            id_offer,
            percent_discount,
            price_item,
            price_options,
            quantity,
            status,
            total_price,
            total_price_with_discount,
        } = req.body;
        const cart = await createCartBuyItem(
            id,
            id_cart_bought,
            id_cart,
            id_offer,
            percent_discount,
            price_item,
            price_options,
            quantity,
            status,
            total_price,
            total_price_with_discount
        );
        if (cart > 0) res.status(201).json({ data: req.body, message: "Cart Item Buy Created" });
        else res.json({ data: req.body, message: "Cart Item Buy Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCartItemsUserForBuyController = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await getCartItemsUserForBuy(id);
        if (cart.length > 0) res.json({ data: cart, message: "Cart Fount" });
        else res.json({ data: [], message: "Cart Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCartBoughtController = async (req, res) => {
    try {
        const id = req.params.id;
        const cart = await getCartBought(id);
        if (cart.length > 0) res.json({ data: cart, message: "Cart Fount" });
        else res.json({ data: [], message: "Cart Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getLastCartItemBoughtController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const idArticle = req.params.id_article;
        const lastCartItemBought = await getLastCartItemBought(idUser, idArticle);
        if (lastCartItemBought.length > 0) res.json({ data: lastCartItemBought[0], message: "Last Cart Item Bought Fount" });
        else res.json({ data: {}, message: "Last Cart Item Bought Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOrdersController = async (req, res) => {
    try {
        const { status } = req.query;
        const orders = await getOrders(status);
        if (orders.length > 0) res.json({ data: orders, message: "Orders Found" });
        else res.json({ data: [], message: "Orders Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOrdersFromShopController = async (req, res) => {
    try {
        const idShop = req.params.id_shop;
        const { status } = req.query;
        const orders = await getOrdersFromShop(idShop, status);
        if (orders.length > 0) res.json({ data: orders, message: "Orders Found" });
        else res.json({ data: [], message: "Orders Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOrdersFromShopAndOrderController = async (req, res) => {
    console.log("_----------------------------------------_");
    console.log(req.params);
    try {
        const idShop = req.params.id_shop;
        const idOrder = req.params.id_order;
        const order = await getOrdersFromShopAndOrder(idShop, idOrder);
        console.log(order);
        if (order.length > 0) res.json({ data: order[0], message: "Order Found" });
        else res.json({ data: {}, message: "Order Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCartBoughtItemStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const cartBoughtItem = await updateCartBoughtItemStatus(id, status);
        if (cartBoughtItem > 0) res.json({ data: req.body, message: "Cart Bought Item Status Updated" });
        else res.json({ data: req.body, message: "Cart Bought Item Status Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOrderByIdController = async (req, res) => {
    try {
        const idOrder = req.params.id_order;
        const order = await getOrderById(idOrder);
        if (order.length > 0) res.json({ data: order[0], message: "Order Found" });
        else res.json({ data: {}, message: "Order Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCartBoughtStatusImageController = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const cart = await updateCartBoughtStatusImage(id, status);
        if (cart) res.json({ data: req.body, message: "Cart Item Status Image Updated" });
        else res.json({ data: req.body, message: "Cart Item Status Image Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCartBoughtStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const cart = await updateCartBoughtStatus(id, status);
        if (cart) res.json({ data: req.body, message: "Cart Item Status Image Updated" });
        else res.json({ data: req.body, message: "Cart Item Status Image Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOrderByIdCartController = async (req, res) => {
    try {
        const idCart = req.params.id_cart;
        const order = await getOrderByIdCart(idCart);
        console.log(order);
        if (order.length > 0) res.json({ data: order[0], message: "Order Found" });
        else res.json({ data: [], message: "Order Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getArticlesOrderedController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const word = req.params.word;
        const orderArticles = await getArticlesOrdered(idUser, word);
        if (orderArticles.length > 0) res.json({ data: orderArticles, message: "Order Articles Found" });
        else res.json({ data: [], message: "Order Articles Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
