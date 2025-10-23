// Models
import {
    createOptionCategory,
    getOptionCategories,
    getOptionCategoryById,
    updateOptionCategory,
} from "../../models/categories/optionCategoriesModel.js";

export const getOptionCategoriesController = async (req, res) => {
    try {
        const optionCategories = await getOptionCategories();
        console.log(optionCategories.length);
        if (optionCategories.length > 0) res.json({ data: optionCategories, message: "Option Categories Created" });
        else res.json({ data: [], message: "Option Categories Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createOptionCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, status } = req.body;
        const optionCategory = await createOptionCategory(id, name, status);
        if (optionCategory) res.status(201).json({ data: req.body, message: "Option Category Updated" });
        else res.json({ data: {}, message: "Option Category Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateOptionCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, status } = req.body;
        const optionCategory = await updateOptionCategory(id, name, status);
        if (optionCategory) res.json({ data: req.body, message: "Option Category Updated" });
        else res.json({ data: {}, message: "Option Category Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOptionCategoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const optionCategory = await getOptionCategoryById(id);
        if (optionCategory.length > 0) res.json({ data: optionCategory[0], message: "Option Categories Created" });
        else res.json({ data: {}, message: "Option Categories Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
