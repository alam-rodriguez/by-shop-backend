import {
    createPeriod,
    createPeriodShopPayout,
    getPeriodActive,
    getPeriodActiveForAllShop,
    getPeriodActiveForShop,
    getPeriodById,
    getPeriods,
    getPeriodsForShop,
    getShopsPeriodActive,
    getShopsPeriodsByPeriodId,
    shopPeriodPayout,
} from "../../models/periods/periodsModels.js";

export const createPeriodController = async (req, res) => {
    try {
        const { id, start_date, end_date, status } = req.body;
        const response = await createPeriod(id, start_date, end_date, status);
        return res.status(response ? 201 : 200).json({ data: req.body, message: response ? "Period Created" : "Period Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPeriodActiveController = async (req, res) => {
    try {
        const response = await getPeriodActive();
        return res.json({
            data: response.length > 0 ? response[0] : null,
            message: response.length > 0 ? "Period Active Found" : "Period Active Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPeriodByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await getPeriodById(id);
        return res.json({
            data: response.length > 0 ? response[0] : null,
            message: response.length > 0 ? "Period Found" : "Period Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPeriodActiveForShopController = async (req, res) => {
    try {
        const shopId = req.params.shop_id;
        const response = await getPeriodActiveForShop(shopId);
        return res.json({
            data: response.length > 0 ? response[0] : null,
            message: response.length > 0 ? "Period Active Found" : "Period Active Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getShopsPeriodActiveController = async (req, res) => {
    try {
        const response = await getShopsPeriodActive();
        return res.json({
            data: response.length > 0 ? response : null,
            message: response.length > 0 ? "Shops Period Active Found" : "Shops Period Active Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPeriodActiveForAllShopController = async (req, res) => {
    try {
        const response = await getPeriodActiveForAllShop();
        return res.json({
            data: response,
            message: response.length > 0 ? "Period Active Found" : "Period Active Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getShopsPeriodsByPeriodIdController = async (req, res) => {
    try {
        const PeriodId = req.params.id;
        const response = await getShopsPeriodsByPeriodId(PeriodId);
        return res.json({
            data: response,
            message: response.length > 0 ? "Shops Periods Founds" : "Shops Periods Not Founds",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createPeriodShopPayoutController = async (req, res) => {
    try {
        const { id, period_id, shop_id, amount, commission, net_amount, currency_id } = req.body;
        const periodPayout = await shopPeriodPayout(period_id, shop_id);
        if (periodPayout.length > 0) return res.json({ data: req.body, message: "This Shop Was Payout For The Period" });
        const response = await createPeriodShopPayout(id, period_id, shop_id, amount, commission, net_amount, currency_id);
        return res.status(response ? 201 : 200).json({ data: req.body, message: response ? "Period Payout Created" : "Period Payout Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPeriodsController = async (req, res) => {
    try {
        const response = await getPeriods();
        return res.json({
            data: response,
            message: response.length > 0 ? "Periods Found" : "Periods Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPeriodsForShopController = async (req, res) => {
    try {
        const shopId = req.params.shop_id;
        const response = await getPeriodsForShop(shopId);
        return res.json({
            data: response,
            message: response.length > 0 ? "Periods Shops Founds" : "Periods Shops Not Founds",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
