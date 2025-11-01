// Models
import { createShop, getShops, getShopsById, getShopsForCart, updateShop, updateStatusShop } from "../../models/shops/shopModel.js";

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
        const {
            id,
            name,
            description,
            logo,
            type,
            country_id,
            province_id,
            municipality_id,
            district_id,
            neighborhood_id,
            street,
            local_number,
            address_details,
            postal_code,
            phone_number,
            latitude,
            longitude,
            status,
        } = req.body;
        const shop = await createShop(
            id,
            name,
            description,
            logo,
            type,
            country_id,
            province_id,
            municipality_id,
            district_id,
            neighborhood_id,
            street,
            local_number,
            address_details,
            postal_code,
            phone_number,
            latitude,
            longitude,
            status
        );
        if (shop == 1) res.status(201).json({ data: req.body, message: "Shop Created" });
        else res.json({ data: {}, message: "Shop Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateShopController = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
            description,
            logo,
            type,
            country_id,
            province_id,
            municipality_id,
            district_id,
            neighborhood_id,
            street,
            local_number,
            address_details,
            postal_code,
            phone_number,
            latitude,
            longitude,
            status,
        } = req.body;
        const shop = await updateShop(
            id,
            name,
            description,
            logo,
            type,
            country_id,
            province_id,
            municipality_id,
            district_id,
            neighborhood_id,
            street,
            local_number,
            address_details,
            postal_code,
            phone_number,
            latitude,
            longitude,
            status
        );
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

export const getShopsForCartController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const shops = await getShopsForCart(idUser);
        if (shops.length > 0) res.json({ data: shops, message: "Shops found" });
        else res.status(404).json({ data: [], message: "Shops Not found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
