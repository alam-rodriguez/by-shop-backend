// Models
import { createShop, getShops, getShopsById, updateShop, updateStatusShop } from "../../models/shops/shopModel.js";

export const getShopsController = async (req, res) => {
    try {
        const shops = await getShops();
        console.log(shops);
        if (shops.length > 0) res.json({ data: shops, message: "Shops founds" });
        else res.status(404).json({ data: [], message: "Shops Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const getShopsByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const shop = await getShopsById(id);
        if (shop.length > 0) res.json({ data: shop[0], message: "Shop found" });
        else res.json({ data: {}, message: "Shop Not found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const createShopController = async (req, res) => {
//     try {
//         const { id, name, logo, create_date, type, status } = req.body;
//         const shop = await createShop(id, name, logo, create_date, type, status);
//         if (shop == 1) res.status(201).json({ data: req.body, message: "Shop Created" });
//         else res.json({ data: {}, message: "Shop Not Created" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };
export const createShopController = async (req, res) => {
    try {
        const { id, name, description, logo, type, status } = req.body;
        const shop = await createShop(id, name, description, logo, type, status);
        if (shop == 1) res.status(201).json({ data: req.body, message: "Shop Created" });
        else res.json({ data: {}, message: "Shop Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateShopController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, logo, type, status } = req.body;
        const shop = await updateShop(id, name, logo, type, status);
        if (shop == 1) res.json({ data: req.body, message: "Shop Updated" });
        else res.json({ data: {}, message: "Shop Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateStatusShopController = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const shop = await updateStatusShop(id, status);
        if (shop == 1) res.json({ data: status, message: "Shop Status Updated" });
        else res.json({ data: false, message: "Shop Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
