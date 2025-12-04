import { createShopCode, getDataShopCode, getShopCodeById, getShopsCodes, setUseShopCode, updateShopCode } from "../../models/shops/shopsCodes.js";

export const getShopsCodesController = async (req, res) => {
    try {
        const shopsCodes = await getShopsCodes();
        return res.json({ data: shopsCodes, message: shopsCodes.length > 0 ? "Shops Codes founds" : "Shops Codes Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getShopCodeByIdController = async (req, res) => {
    try {
        const shopsCodes = await getShopCodeById(req.params.id);
        return res.json({ data: shopsCodes[0], message: shopsCodes.length > 0 ? "Shops Codes founds" : "Shops Codes Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createShopCodeController = async (req, res) => {
    try {
        const { id, shops_plans_id, status, code, used_at } = req.body;
        const newShopCode = await createShopCode(id, shops_plans_id, status, code, used_at);
        if (newShopCode) return res.status(201).json({ data: req.body, message: "Shop Code created successfully" });
        return res.json({ data: req.body, message: "Failed to create Shop Code" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateShopCodeController = async (req, res) => {
    try {
        const { id, shops_plans_id, status, code, used_at } = req.body;
        const newShopCode = await updateShopCode(id, shops_plans_id, status, code, used_at);
        return res.json({ data: req.body, message: newShopCode ? "Shop Code updated successfully" : "Failed to update Shop Code" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const setUseShopCodeController = async (req, res) => {
    try {
        const id = req.params.id;
        const usedByShopId = req.body.used_by_shop_id;
        const newShopCode = await setUseShopCode(id, usedByShopId);
        return res.json({ data: req.body, message: newShopCode ? "Shop Code updated successfully" : "Failed to update Shop Code" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDataShopCodeController = async (req, res) => {
    try {
        const shopsCodes = await getDataShopCode(req.params.code);
        if (shopsCodes.length === 0) return res.json({ data: {}, message: "Shop Code Not found", exists: false });
        return res.json({ data: shopsCodes[0], message: shopsCodes.length > 0 ? "Shops Codes founds" : "Shops Codes Not founds", exists: true });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
