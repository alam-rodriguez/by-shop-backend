// Models
import { createBrand, getBrandById, getBrands, updateBrand } from "../../models/brands/BrandsModel.js";

export const getBrandsController = async (req, res) => {
    try {
        const brands = await getBrands();
        if (brands.length > 0) res.json({ message: "Brands founds", data: brands });
        else res.json({ message: "Brands Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createBrandController = async (req, res) => {
    try {
        const { id, name, description, image, status, created_date } = req.body;
        const user = await createBrand(id, name, description, image, status, created_date);
        if (user == 1) res.status(201).json({ data: req.body, message: "Brand Created" });
        else res.json({ data: req.body, message: "Brand Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateBrandController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, image, status } = req.body;
        const user = await updateBrand(id, name, description, image, status);
        if (user) res.json({ data: req.body, message: "Brand Updated" });
        else res.json({ data: req.body, message: "Brand Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getBrandByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const brands = await getBrandById(id);
        if (brands.length > 0) res.json({ message: "Brand found", data: brands[0] });
        else res.json({ message: "Brand Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
