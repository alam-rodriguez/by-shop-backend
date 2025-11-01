import express from "express";
const router = express.Router();

// Controllers
import {
    createCountryController,
    createMunicipalityController,
    createNeighborhoodController,
    createProvinceController,
    getCountriesController,
    getCountryByIdController,
    getMunicipalitiesByIdProvinceController,
    getMunicipalitiesController,
    getMunicipalityByIdController,
    getNeighborhoodByIdController,
    getNeighborhoodsByIdMunicipalityController,
    getNeighborhoodsController,
    getProvinceByIdController,
    getProvincesByIdCountryController,
    getProvincesController,
    updateCountryController,
    updateMunicipalityController,
    updateNeighborhoodController,
    updateProvincesController,
} from "../../controllers/locations/locationsControllers.js";

// Countries
router.get("/countries", getCountriesController);
router.get("/countries/:id", getCountryByIdController);
router.post("/countries", createCountryController);
router.put("/countries/:id", updateCountryController);

// Provinces
router.get("/provinces", getProvincesController);
router.get("/provinces/:id", getProvinceByIdController);
router.post("/provinces", createProvinceController);
router.put("/provinces/:id", updateProvincesController);
router.get("/provinces/by-country/:country_id", getProvincesByIdCountryController);

// Municipalities
router.get("/municipalities", getMunicipalitiesController);
router.get("/municipalities/:id", getMunicipalityByIdController);
router.post("/municipalities", createMunicipalityController);
router.put("/municipalities/:id", updateMunicipalityController);
router.get("/municipalities/by-province/:province_id", getMunicipalitiesByIdProvinceController);

// Neighborhoods
router.get("/neighborhoods", getNeighborhoodsController);
router.get("/neighborhoods/:id", getNeighborhoodByIdController);
router.post("/neighborhoods", createNeighborhoodController);
router.put("/neighborhoods/:id", updateNeighborhoodController);
router.get("/neighborhoods/by-municipality/:municipality_id", getNeighborhoodsByIdMunicipalityController);

getProvincesController;

export default router;
