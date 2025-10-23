// Models
import {
    changeSlugCategoryIndirect,
    changeStatusCategoryIndirect,
    createCategoryIndirect,
    getCategoriesIndirects,
    getCategoryIndirectById,
    updateCategoryIndirect,
} from "../../models/categories/categoriesIndirectsModel copy.js";

export const getCategoriesIndirectsController = async (req, res) => {
    try {
        const categories = await getCategoriesIndirects();
        if (categories.length > 0) res.json({ message: "Categories found", data: categories });
        else res.json({ message: "Categories Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCategoryIndirectByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await getCategoryIndirectById(id);
        if (category.length > 0) res.json({ message: "Category found", data: category });
        else res.json({ message: "Category Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createCategoryIndirectController = async (req, res) => {
    try {
        const { id, slug, status, nombre, color, view, created_date } = req.body;
        const category = await createCategoryIndirect(id, slug, status, nombre, color, view, created_date);
        if (category) res.status(201).json({ message: "Category Created", data: req.body });
        else res.json({ message: "Category Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCategoryIndirectController = async (req, res) => {
    try {
        const id = req.params.id;
        const { status, nombre, color, view } = req.body;
        const category = await updateCategoryIndirect(id, status, nombre, color, view);
        if (category) res.json({ message: "Category Update", data: req.body });
        else res.status(404).json({ message: "Category Not Update", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const changeSlugCategoryIndirectController = async (req, res) => {
    try {
        const id = req.params.id;
        const slug = req.body.slug;
        const category = await changeSlugCategoryIndirect(id, slug);
        if (category) res.json({ message: "Category Slug Update", data: slug });
        else res.status(404).json({ message: "Category Slug Not Update", data: false });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const changeStatusCategoryIndirectController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const category = await changeStatusCategoryIndirect(id, status);
        if (category) res.json({ message: "Category Status Update", data: status });
        else res.status(404).json({ message: "Category Status Not Update", data: false });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
