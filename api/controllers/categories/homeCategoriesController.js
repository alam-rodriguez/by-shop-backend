import {
    createHomeCategory,
    createHomeCategoryStore,
    getHomeCategories,
    getHomeCategoriesForApp,
    getHomeCategoryById,
    getHomeCategoryStore,
    getHomeCategoryStoreByIdHomeCategory,
    updateHomeCategory,
    updateHomeCategoryStore,
} from "../../models/categories/homeCategoriesModel.js";

export const getHomeCategoriesController = async (req, res) => {
    try {
        const categories = await getHomeCategories();
        if (categories.length > 0) res.json({ message: "Categories found", data: categories });
        else res.json({ message: "Categories Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getHomeCategoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const categories = await getHomeCategoryById(id);
        if (categories.length > 0) res.json({ message: "Categories found", data: categories[0] });
        else res.json({ message: "Categories Not found", data: null });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createHomeCategoryController = async (req, res) => {
    try {
        const { id, name, description, sort_order, status } = req.body;
        const categories = await createHomeCategory(id, name, description, sort_order, status);
        if (categories) res.status(201).json({ message: "Home Category Created", data: req.body });
        else res.json({ message: "Home Category Not Created", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateHomeCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, sort_order, status } = req.body;
        const categories = await updateHomeCategory(id, name, description, sort_order, status);
        if (categories) res.json({ message: "Home Category Updated", data: req.body });
        else res.json({ message: "Home Category Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const getHomeCategoriesController = async (req, res) => {
//     try {
//         const categories = await getHomeCategories();
//         if (categories.length > 0) res.json({ message: "Categories found", data: categories });
//         else res.json({ message: "Categories Not found", data: [] });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

export const getHomeCategoryStoreByIdHomeCategoryController = async (req, res) => {
    try {
        const homeCategoryId = req.params.home_category_id;
        const categoryStore = await getHomeCategoryStoreByIdHomeCategory(homeCategoryId);
        if (categoryStore.length > 0) res.json({ message: "Category Store found", data: categoryStore });
        else res.json({ message: "Category Store Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createHomeCategoryStoreController = async (req, res) => {
    try {
        const { id, home_category_id, store_id, top, status } = req.body;
        const result = await createHomeCategoryStore(id, home_category_id, store_id, top, status);
        if (result) res.status(201).json({ message: "Home Category Store Created", data: req.body });
        else res.json({ message: "Home Category Store Not Created", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateHomeCategoryStoreController = async (req, res) => {
    try {
        const id = req.params.id;
        const { home_category_id, store_id, top, status } = req.body;
        const categories = await updateHomeCategoryStore(id, home_category_id, store_id, top, status);
        if (categories) res.json({ message: "Home Category Store Updated", data: req.body });
        else res.json({ message: "Home Category Store Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getHomeCategoryStoreController = async (req, res) => {
    try {
        const homeCategoryId = req.params.home_category_id;
        const categoryStore = await getHomeCategoryStore(homeCategoryId);
        if (categoryStore.length > 0) res.json({ message: "Category Store found", data: categoryStore });
        else res.json({ message: "Category Store Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getHomeCategoriesForAppController = async (req, res) => {
    try {
        const categories = await getHomeCategoriesForApp();
        if (categories.length > 0) res.json({ message: "Categories found", data: categories });
        else res.json({ message: "Categories Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
