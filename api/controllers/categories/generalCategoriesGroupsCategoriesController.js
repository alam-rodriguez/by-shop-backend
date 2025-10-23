// Models
import {
    createGeneralCategoryGroupCategory,
    deleteGeneralCategoryGroupCategory,
    updateGeneralCategoryGroupCategory,
} from "../../models/categories/generalCategoriesGroupsCategoriesModel.js";
import { getGeneralCategoryGroupById } from "../../models/categories/generalCategoriesGroupsModel.js";

export const createGeneralCategoryGroupCategoryController = async (req, res) => {
    try {
        const { id, general_category_group_id, id_category } = req.body;
        const generalCategoryGroup = await createGeneralCategoryGroupCategory(id, general_category_group_id, id_category);
        if (generalCategoryGroup == 1) res.status(201).json({ data: req.body, message: "General Category Group Created" });
        else res.json({ data: req.body, message: "General Category Group Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateGeneralCategoryGroupCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { general_category_group_id, id_category } = req.body;
        const generalCategoryGroup = await updateGeneralCategoryGroupCategory(id, general_category_group_id, id_category);
        if (generalCategoryGroup) res.json({ data: req.body, message: "General Category Group Updated" });
        else res.json({ data: req.body, message: "General Category Group Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getGeneralCategoryGroupByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const generalCategoryGroup = await getGeneralCategoryGroupById(id);
        if (generalCategoryGroup) res.json({ data: generalCategoryGroup[0], message: "General Category Group Updated" });
        else res.json({ data: [], message: "General Category Group Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteGeneralCategoryGroupCategoryController = async (req, res) => {
    try {
        const { general_category_group_id, id_category } = req.params;
        const generalCategoryGroup = await deleteGeneralCategoryGroupCategory(general_category_group_id, id_category);
        if (generalCategoryGroup) res.json({ data: req.body, message: "General Category Group Deleted" });
        else res.json({ data: req.body, message: "General Category Group Not Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
