// Modals
import { getDirectsCategoriesByIdDepartment } from "../../models/categories/categoriesModel.js";
import { getDepartmentsForApp } from "../../models/categories/departmentsController.js";

export const getDepartmentsForAppController = async (req, res) => {
    try {
        const departments = await getDepartmentsForApp();
        if (departments.length > 0) res.json({ message: "Departments found", data: departments });
        else res.json({ message: "Departments Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
