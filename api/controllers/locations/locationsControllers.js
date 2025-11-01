// Models
import {
    createCountry,
    createMunicipality,
    createNeighborhood,
    createProvince,
    getCountries,
    getCountryById,
    getMunicipalities,
    getMunicipalitiesByIdProvince,
    getMunicipalityById,
    getNeighborhoodById,
    getNeighborhoods,
    getNeighborhoodsByIdMunicipality,
    getProvinceById,
    getProvinces,
    getProvincesByIdCountry,
    updateCountry,
    updateMunicipality,
    updateNeighborhood,
    updateProvinces,
} from "../../models/locations/locationsModels.js";

export const getCountriesController = async (req, res) => {
    try {
        const countries = await getCountries();
        if (countries.length > 0) res.json({ message: "Countries founds", data: countries });
        else res.json({ message: "Countries Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getCountryByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const countries = await getCountryById(id);
        if (countries.length > 0) res.json({ message: "Country found", data: countries[0] });
        else res.json({ message: "Country Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createCountryController = async (req, res) => {
    try {
        const { id, name, description, iso_code, latitude, longitude, status } = req.body;
        const result = await createCountry(id, name, description, iso_code, latitude, longitude, status);
        if (result) res.status(201).json({ message: "Country Created", data: req.body });
        else res.json({ message: "Countries Not found", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateCountryController = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, iso_code, latitude, longitude, status } = req.body;
        const result = await updateCountry(id, name, description, iso_code, latitude, longitude, status);
        if (result) res.json({ message: "Country Updated", data: req.body });
        else res.json({ message: "Countries Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProvincesController = async (req, res) => {
    try {
        const provinces = await getProvinces();
        if (provinces.length > 0) res.json({ message: "Provinces founds", data: provinces });
        else res.json({ message: "Provinces Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProvinceByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const provinces = await getProvinceById(id);
        if (provinces.length > 0) res.json({ message: "Province found", data: provinces[0] });
        else res.json({ message: "Province Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createProvinceController = async (req, res) => {
    try {
        const { id, country_id, name, description, latitude, longitude, status } = req.body;
        const result = await createProvince(id, country_id, name, description, latitude, longitude, status);
        if (result) res.status(201).json({ message: "Province Created", data: req.body });
        else res.json({ message: "Province Not found", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateProvincesController = async (req, res) => {
    try {
        const id = req.params.id;
        const { country_id, name, description, latitude, longitude, status } = req.body;
        const result = await updateProvinces(id, country_id, name, description, latitude, longitude, status);
        if (result) res.json({ message: "Province Updated", data: req.body });
        else res.json({ message: "Province Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getMunicipalitiesController = async (req, res) => {
    try {
        const provinces = await getMunicipalities();
        if (provinces.length > 0) res.json({ message: "Provinces founds", data: provinces });
        else res.json({ message: "Provinces Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getMunicipalityByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const provinces = await getMunicipalityById(id);
        if (provinces.length > 0) res.json({ message: "Province found", data: provinces[0] });
        else res.json({ message: "Province Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createMunicipalityController = async (req, res) => {
    try {
        const { id, province_id, name, description, latitude, longitude, status } = req.body;
        const result = await createMunicipality(id, province_id, name, description, latitude, longitude, status);
        if (result) res.status(201).json({ message: "Province Created", data: req.body });
        else res.json({ message: "Province Not found", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateMunicipalityController = async (req, res) => {
    try {
        const id = req.params.id;
        const { province_id, name, description, latitude, longitude, status } = req.body;
        const result = await updateMunicipality(id, province_id, name, description, latitude, longitude, status);
        if (result) res.json({ message: "Province Updated", data: req.body });
        else res.json({ message: "Province Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getNeighborhoodsController = async (req, res) => {
    try {
        const provinces = await getNeighborhoods();
        if (provinces.length > 0) res.json({ message: "Provinces founds", data: provinces });
        else res.json({ message: "Provinces Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getNeighborhoodByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const provinces = await getNeighborhoodById(id);
        if (provinces.length > 0) res.json({ message: "Province found", data: provinces[0] });
        else res.json({ message: "Province Not found", data: {} });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createNeighborhoodController = async (req, res) => {
    try {
        const { id, municipality_id, name, description, latitude, longitude, status } = req.body;
        const result = await createNeighborhood(id, municipality_id, name, description, latitude, longitude, status);
        if (result) res.status(201).json({ message: "Province Created", data: req.body });
        else res.json({ message: "Province Not found", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateNeighborhoodController = async (req, res) => {
    try {
        const id = req.params.id;
        const { municipality_id, name, description, latitude, longitude, status } = req.body;
        const result = await updateNeighborhood(id, municipality_id, name, description, latitude, longitude, status);
        if (result) res.json({ message: "Province Updated", data: req.body });
        else res.json({ message: "Province Not Updated", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProvincesByIdCountryController = async (req, res) => {
    try {
        const countryId = req.params.country_id;
        const countries = await getProvincesByIdCountry(countryId);
        if (countries.length > 0) res.json({ message: "Countries founds", data: countries });
        else res.json({ message: "Countries Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getMunicipalitiesByIdProvinceController = async (req, res) => {
    try {
        const provinceId = req.params.province_id;
        const countries = await getMunicipalitiesByIdProvince(provinceId);
        if (countries.length > 0) res.json({ message: "Countries founds", data: countries });
        else res.json({ message: "Countries Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getNeighborhoodsByIdMunicipalityController = async (req, res) => {
    try {
        const municipalityId = req.params.municipality_id;
        const countries = await getNeighborhoodsByIdMunicipality(municipalityId);
        if (countries.length > 0) res.json({ message: "Countries founds", data: countries });
        else res.json({ message: "Countries Not found", data: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
