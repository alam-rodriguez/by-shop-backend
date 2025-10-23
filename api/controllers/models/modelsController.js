// Models
import { createModel, getModelById, getModels, updateModel } from "../../models/models/modelsModel.js";

export const getModelsController = async (req, res) => {
    try {
        const models = await getModels();
        if (models.length > 0) res.json({ message: "Models founds", data: models });
        else res.json({ message: "Models Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getModelByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const models = await getModelById(id);
        if (models.length > 0) res.json({ message: "Model founds", data: models[0] });
        else res.json({ message: "Model Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createModelController = async (req, res) => {
    try {
        const { id, name, description, id_brand, image, status, created_date } = req.body;
        const model = await createModel(id, name, description, id_brand, image, status, created_date);
        if (model == 1) res.status(201).json({ data: req.body, message: "Model Created" });
        else res.json({ data: req.body, message: "Model Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateModelController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, id_brand, image, status } = req.body;
        const model = await updateModel(id, name, description, id_brand, image, status);
        if (model) res.json({ data: req.body, message: "Model Updated" });
        else res.json({ data: req.body, message: "Model Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
