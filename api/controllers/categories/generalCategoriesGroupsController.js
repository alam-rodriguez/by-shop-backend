// Models
import {
    createGeneralCategoryGroup,
    getCategoriesOfGeneralCategoryGroupForApp,
    getGeneralCategoriesGroups,
    updateGeneralCategoryGroup,
} from "../../models/categories/generalCategoriesGroupsModel.js";
// Modals for app
import { getGeneralCategoriesGroupsForApp } from "../../models/categories/generalCategoriesGroupsModel.js";

export const getGeneralCategoriesGroupsController = async (req, res) => {
    try {
        const generalCategoriesGroups = await getGeneralCategoriesGroups();
        if (generalCategoriesGroups.length > 0) res.json({ message: "General Categories Groups founds", data: generalCategoriesGroups });
        else res.json({ message: "General Categories Groups Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createGeneralCategoryGroupController = async (req, res) => {
    try {
        const { id, name, slug, description, status } = req.body;
        const generalCategoryGroup = await createGeneralCategoryGroup(id, name, slug, description, status);
        if (generalCategoryGroup == 1) res.status(201).json({ data: req.body, message: "General Category Group Created" });
        else res.json({ data: req.body, message: "General Category Group Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateGeneralCategoryGroupController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, slug, description, status } = req.body;
        const generalCategoryGroup = await updateGeneralCategoryGroup(id, name, slug, description, status);
        if (generalCategoryGroup) res.json({ data: req.body, message: "General Category Group Updated" });
        else res.json({ data: req.body, message: "General Category Group Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getGeneralCategoriesGroupsForAppController = async (req, res) => {
    try {
        const generalCategoriesGroups = await getGeneralCategoriesGroupsForApp();
        if (generalCategoriesGroups.length > 0) res.json({ message: "General Categories Groups founds", data: generalCategoriesGroups });
        else res.json({ message: "General Categories Groups Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCategoriesOfGeneralCategoryGroupForAppController = async (req, res) => {
    try {
        const id = req.params.id;
        const categories = await getCategoriesOfGeneralCategoryGroupForApp(id);
        if (categories.length > 0) res.json({ message: "Categories of Groups found", data: categories });
        else res.json({ message: "Categories of Groups Not found", data: [] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
