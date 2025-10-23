// Models
import { createOption, getOptionById, getOptions, getValueOption, updateOption } from "../../models/options/optionsModels.js";
import { getValuesOPtions, createValueOption, updateValueOption } from "../../models/options/optionsModels.js";

import { createModel, getModels, updateModel } from "../../models/models/modelsModel.js";

export const getOptionsController = async (req, res) => {
    try {
        const options = await getOptions();
        if (options.length > 0) res.json({ message: "Options founds", data: options });
        else res.json({ message: "Options Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOptionByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const options = await getOptionById(id);
        if (options.length > 0) res.json({ message: "Option founds", data: options[0] });
        else res.json({ message: "Option Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createOptionController = async (req, res) => {
    try {
        const { id, name, require_image, require_color, require_quantity, require_price, id_option_category, type, status } = req.body;
        const option = await createOption(id, name, require_image, require_color, require_quantity, require_price, id_option_category, type, status);
        if (option == 1) res.status(201).json({ data: req.body, message: "Option Created" });
        else res.json({ data: req.body, message: "Option Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateOptionController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, id_option_category, require_image, require_color, require_quantity, require_price, type, status } = req.body;
        const option = await updateOption(id, name, id_option_category, require_image, require_color, require_quantity, require_price, type, status);
        if (option) res.json({ data: req.body, message: "Option Updated" });
        else res.json({ data: req.body, message: "Option Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getValuesOPtionsController = async (req, res) => {
    try {
        const options = await getValuesOPtions();
        if (options.length > 0) res.json({ message: "Options Values founds", data: options });
        else res.json({ message: "Options Values Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getValueOptionController = async (req, res) => {
    try {
        const id = req.params.id;
        const options = await getValueOption(id);
        if (options.length > 0) res.json({ message: "Option Value found", data: options[0] });
        else res.json({ message: "Option Value Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createValueOptionController = async (req, res) => {
    try {
        const { id, name, id_option, status } = req.body;
        const valueOption = await createValueOption(id, name, name, id_option, status);
        if (valueOption == 1) res.status(201).json({ data: req.body, message: "Option Value Created" });
        else res.json({ data: req.body, message: "Option Value Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateValueOptionController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, id_option, status } = req.body;
        const valueOption = await updateValueOption(id, name, name, id_option, status);
        if (valueOption) res.json({ data: req.body, message: "Option Value Updated" });
        else res.json({ data: req.body, message: "Option Value Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
