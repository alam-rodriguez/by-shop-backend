import {
    changeSlugCategory,
    changeStatusCategory,
    createCategory,
    createDepartment,
    createDirectCategoryDepartament,
    deleteDirectCategoryDepartament,
    getCategories,
    getCategoriesByType,
    getCategoryById,
    getDepartmentById,
    getDepartments,
    getDirectCategories,
    getDirectCategoriesForApp,
    getDirectsCategoriesByIdDepartment,
    getGeneralCategories,
    getGeneralCategoriesAndArticles,
    getGeneralCategoriesAndCategories,
    getGeneralCategoriesOfArticle,
    getIndirectCategories,
    getIndirectCategoriesForAppHome,
    updateCategory,
    updateDepartment,
} from "../../models/categories/categoriesModel.js";

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await getCategories();
        if (categories.length > 0) res.json({ message: "Categories found", data: categories });
        else res.json({ message: "Categories Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDirectCategoriesController = async (req, res) => {
    try {
        const categories = await getDirectCategories();
        if (categories.length > 0) res.json({ message: "Categories directs found", data: categories });
        else res.json({ message: "Categories directs Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getGeneralCategoriesController = async (req, res) => {
    try {
        const categories = await getGeneralCategories();
        if (categories.length > 0) res.json({ message: "Categories general found", data: categories });
        else res.json({ message: "Categories general Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getGeneralCategoriesOfArticleController = async (req, res) => {
    try {
        const idArticle = req.params.id_article;
        const generalCategoriesOfArticles = await getGeneralCategoriesOfArticle(idArticle);
        if (generalCategoriesOfArticles.length > 0) res.json({ message: "General Categories Of article found", data: generalCategoriesOfArticles });
        else res.json({ message: "General Categories Of article Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getIndirectsCategoriesController = async (req, res) => {
    try {
        const categories = await getIndirectCategories();
        if (categories.length > 0) res.json({ message: "Categories indirects found", data: categories });
        else res.json({ message: "Categories indirects Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getIndirectCategoriesForAppHomeController = async (req, res) => {
    try {
        const categories = await getIndirectCategoriesForAppHome();
        if (categories.length > 0) res.json({ message: "Categories indirects found", data: categories });
        else res.json({ message: "Categories indirects Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCategoryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await getCategoryById(id);
        console.log(category);
        if (category.length > 0) res.json({ message: "Category found", data: category[0] });
        else res.json({ message: "Category Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createCategoryController = async (req, res) => {
    console.log(req.body);
    try {
        const { id, slug, type, status, name, description, image, color, view, created_date } = req.body;
        const category = await createCategory(id, slug, type, status, name, description, image, color, view, created_date);
        if (category) res.status(201).json({ message: "Category Created", data: req.body });
        else res.json({ message: "Category Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const { status, name, description, image, color, view } = req.body;
        const category = await updateCategory(id, status, name, description, image, color, view);
        console.log(category);
        if (category) res.json({ message: "Category Update", data: req.body });
        else res.status(404).json({ message: "Category Not Update", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const changeSlugCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const slug = req.body.slug;
        const category = await changeSlugCategory(id, slug);
        if (category) res.json({ message: "Category Slug Update", data: slug });
        else res.status(404).json({ message: "Category Slug Not Update", data: false });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const changeStatusCategoryController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const category = await changeStatusCategory(id, status);
        if (category) res.json({ message: "Category Status Update", data: status });
        else res.status(404).json({ message: "Category Status Not Update", data: false });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDirectCategoriesForAppController = async (req, res) => {
    try {
        const categories = await getDirectCategoriesForApp();
        if (categories.length > 0) res.json({ message: "Categories directs found", data: categories });
        else res.json({ message: "Categories directs Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getGeneralCategoriesAndArticlesController = async (req, res) => {
    try {
        const categories = await getGeneralCategoriesAndArticles();
        if (categories.length > 0) res.json({ message: "General category Articles found", data: categories });
        else res.json({ message: "General category Articles Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getGeneralCategoriesAndCategoriesController = async (req, res) => {
    try {
        const generalCategoriesGroup = await getGeneralCategoriesAndCategories();
        if (generalCategoriesGroup.length > 0) res.json({ message: "General Categories And Categories Found", data: generalCategoriesGroup });
        else res.json({ message: "General Categories And Categories Not Found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDepartmentsController = async (req, res) => {
    try {
        const departments = await getDepartments();
        if (departments.length > 0) res.json({ message: "Departments found", data: departments });
        else res.json({ message: "Departments Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDepartmentByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const departments = await getDepartmentById(id);
        if (departments.length > 0) res.json({ message: "Department found", data: departments[0] });
        else res.json({ message: "Department Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createDepartmentController = async (req, res) => {
    console.log(req.body);
    try {
        const { id, slug, status, name, short_name, description, image, color, view } = req.body;
        const department = await createDepartment(id, slug, status, name, short_name, description, image, color, view);
        if (department) res.status(201).json({ message: "Departments Created", data: req.body });
        else res.json({ message: "Departments Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateDepartmentController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, short_name, description, slug, image, color, status, view } = req.body;
        const department = await updateDepartment(id, name, short_name, description, slug, image, color, status, view);
        if (department) res.json({ message: "Departments Update", data: req.body });
        else res.json({ message: "Departments Not Update", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createDirectCategoryDepartamentController = async (req, res) => {
    try {
        const { id, id_department, id_direct_category, status } = req.body;
        const department = await createDirectCategoryDepartament(id, id_department, id_direct_category, status);
        if (department) res.status(201).json({ message: "Direct Category Department Created", data: req.body });
        else res.json({ message: "Direct Category Department Not Created", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const deleteDirectCategoryDepartamentController = async (req, res) => {
    try {
        const { id_department: idDepartment, id_category: idCategory } = req.params;
        const directCategory = await deleteDirectCategoryDepartament(idDepartment, idCategory);
        if (directCategory) res.json({ message: "Direct Category Department Deleted", data: req.body });
        else res.json({ message: "Direct Category Department Not Deleted", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCategoriesByTypeController = async (req, res) => {
    try {
        const type = req.query.type;
        console.log(type);
        const categories = await getCategoriesByType(type);
        if (categories.length > 0) res.json({ message: "Categories found", data: categories });
        else res.json({ message: "Categories Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDirectsCategoriesByIdDepartmentController = async (req, res) => {
    try {
        const id = req.params.id;
        const directsCategories = await getDirectsCategoriesByIdDepartment(id);
        if (directsCategories.length > 0) res.json({ message: "Directs Categories found", data: directsCategories });
        else res.json({ message: "Directs Categories Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
