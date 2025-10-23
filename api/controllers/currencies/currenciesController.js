// Models

import { getCurrencies, createCurrency, updateCurrency, getCurrenciesById, getCurrenciesForCustomers, canMakeCurrencyMainCurrency, getMainCurrency } from "../../models/currencies/currenciesModel.js";


export const getCurrenciesController = async (req, res) => {
    try {
        const currencies = await getCurrencies();
        if (currencies.length > 0) res.json({ data: currencies, message: "Currencies Fount" });
        else res.json({ data: [], message: "Currencies Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCurrenciesForCustomersController = async (req, res) => {
    try {
        const currencies = await getCurrenciesForCustomers();
        if (currencies.length > 0) res.json({ data: currencies, message: "Currencies Fount" });
        else res.json({ data: [], message: "Currencies Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCurrenciesByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const currency = await getCurrenciesById(id);
        if (currency.length > 0) res.json({ data: currency[0], message: "Currency Fount" });
        else res.json({ data: [], message: "Currency Not Fount" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createCurrencyController = async (req, res) => {
    try {
        const { id, name, description, exchange_rate, symbol, iso_code, main_currency, status } = req.body;
        const currency = await createCurrency(id, name, description, exchange_rate, symbol, iso_code, main_currency, status);
        if (currency) res.status(201).json({ data: currency, message: "Currency Created" });
        else res.json({ data: [], message: "Currency Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCurrencyController = async (req, res) => {
    try {
        const { id, name, description, exchange_rate, symbol, iso_code, main_currency, status } = req.body;
        const currency = await updateCurrency(id, name, description, exchange_rate, symbol, iso_code, main_currency, status);
        if (currency) res.json({ data: currency, message: "Currency Updated" });
        else res.json({ data: [], message: "Currency Not Updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const canMakeCurrencyMainCurrencyController = async (req, res) => {
    try {
        const id = req.params.id;
        let mainCurrencies = await getMainCurrency();
        const mainCurrency = mainCurrencies[0];
        if (mainCurrencies.length > 0 && mainCurrency.id !== id) res.json({ data: false, message: "Currency Not Can Be Main Currency" });
        else res.json({ data: true, message: "Currency Can Be Main Currency"});
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

