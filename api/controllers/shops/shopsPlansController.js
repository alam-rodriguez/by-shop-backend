// Models
import { createShopPlan, getShopPlanById, getShopsPlans, updateShopPlan } from "../../models/shops/shopPlansModal.js";

export const getShopsPlansController = async (req, res) => {
    try {
        const shopsPlans = await getShopsPlans();
        return res.json({ data: shopsPlans, message: shopsPlans.length > 0 ? "Shops Plans founds" : "Shops Plans Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getShopPlanByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const shopsPlans = await getShopPlanById(id);
        return res.json({ data: shopsPlans[0], message: shopsPlans.length > 0 ? "Shops Plans founds" : "Shops Plans Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createShopPlanController = async (req, res) => {
    try {
        const { id, name, description, price, duration_days, commission_rate, status, rank } = req.body;
        const newShopPlan = await createShopPlan(id, name, description, price, duration_days, commission_rate, status, rank);
        if (newShopPlan) return res.status(201).json({ data: req.body, message: "Shop Plan created successfully" });
        return res.json({ data: req.body, message: "Failed to create Shop Plan" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateShopPlanController = async (req, res) => {
    try {
        const { id, name, description, price, duration_days, commission_rate, status, rank } = req.body;
        const newShopPlan = await updateShopPlan(id, name, description, price, duration_days, commission_rate, status, rank);
        return res.json({ data: req.body, message: newShopPlan ? "Shop Plan updated successfully" : "Failed to update Shop Plan" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
