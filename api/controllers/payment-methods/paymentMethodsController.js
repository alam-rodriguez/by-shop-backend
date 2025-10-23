// Models
import {
    createPaymentMethod,
    getPaymentMethodById,
    getPaymentMethods,
    updatePaymentMethod,
} from "../../models/payment-methods/paymentMethodsModels.js";

export const getPaymentMethodsController = async (req, res) => {
    try {
        const paymentMethods = await getPaymentMethods();
        if (paymentMethods.length > 0) res.json({ data: paymentMethods, message: "Payment Methods founds" });
        else res.json({ data: [], message: "Payment Methods Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createPaymentMethodController = async (req, res) => {
    try {
        const { id, name, description, type, require_image, status, bank_name, is_paypal_method, bank_account } = req.body;
        const paymentMethod = await createPaymentMethod(
            id,
            name,
            description,
            type,
            require_image,
            status,
            bank_name,
            is_paypal_method,
            bank_account
        );
        if (paymentMethod == 1) res.status(201).json({ data: req.body, message: "Payment Method Created" });
        else res.json({ data: {}, message: "Payment Method Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updatePaymentMethodController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, type, require_image, status, bank_name, is_paypal_method, bank_account } = req.body;
        const paymentMethod = await updatePaymentMethod(
            id,
            name,
            description,
            type,
            require_image,
            status,
            bank_name,
            is_paypal_method,
            bank_account
        );
        if (paymentMethod == 1) res.json({ data: req.body, message: "Payment Method Updated" });
        else res.json({ data: {}, message: "Payment Method Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPaymentMethodByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const paymentMethod = await getPaymentMethodById(id);
        if (paymentMethod.length > 0) res.json({ data: paymentMethod[0], message: "Payment Method found" });
        else res.json({ data: {}, message: "Payment Method Not found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
