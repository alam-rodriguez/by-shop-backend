// Models
import { getAppData, createAppData, updateAppData } from "../../models/app-data/appDataModel.js";

export const getAppDataController = async (req, res) => {
    try {
        const appData = await getAppData();
        if (appData.length > 0) res.json({ data: appData, message: "Data Found" });
        else res.json({ data: [], message: "Data Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.error.message });
    }
};

export const createAppDataController = async (req, res) => {
    const { app_name, promotions_on_view, commissions } = req.body;
    const result = await createAppData(app_name, promotions_on_view, commissions);
    console.log(result);
    res.send("tabla app_data created");
};

export const updateAppDataController = async (req, res) => {
    try {
        const { app_name, promotions_on_view, commissions } = req.body;
        const result = await updateAppData(app_name, promotions_on_view, commissions);
        console.log(result);
        res.json({ message: "Tabla app_data Updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.error.message });
    }
};
