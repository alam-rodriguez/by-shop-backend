// Requests
import {
    createAdvertisement,
    getAdvertisementById,
    getAdvertisements,
    getAdvertisementsForApp,
    updateAdvertisement,
} from "../../models/advertisements/advertisementsModal.js";

export const createAdvertisementController = async (req, res) => {
    try {
        const { id, name, description, article_id, link, sort_order, status } = req.body;
        const result = await createAdvertisement(id, name, description, article_id, link, sort_order, status);
        if (result) res.status(201).json({ data: req.body, message: "advertisements Created" });
        else res.json({ data: req.body, message: "advertisements Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateAdvertisementController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, article_id, link, sort_order, status } = req.body;
        const result = await updateAdvertisement(id, name, description, article_id, link, sort_order, status);
        if (result) res.json({ data: req.body, message: "advertisements Updated" });
        else res.json({ data: req.body, message: "advertisements Not Updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getAdvertisementsController = async (req, res) => {
    try {
        const result = await getAdvertisements();
        if (result.length > 0) res.json({ data: result, message: "advertisements Founds" });
        else res.json({ data: result, message: "advertisements Not Founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const getAdvertisementByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getAdvertisementById(id);
        if (result.length > 0) res.json({ data: result[0], message: "advertisement Found" });
        else res.json({ data: result, message: "advertisement Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getAdvertisementsForAppController = async (req, res) => {
    try {
        const result = await getAdvertisementsForApp();
        if (result.length > 0) res.json({ data: result, message: "advertisements Founds" });
        else res.json({ data: [], message: "advertisements Not Founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
