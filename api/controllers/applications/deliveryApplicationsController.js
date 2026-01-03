import {
    createDeliveryApplication,
    getDeliveryApplicationByApplicationId,
    getDeliveryApplications,
} from "../../models/applications/deliveryApplicationsModel.js";

export const createDeliveryApplicationController = async (req, res) => {
    try {
        const {
            id,
            user_id,
            full_name,
            dni_number,
            phone_number,
            email,
            vehicle_type,
            vehicle_brand,
            vehicle_model,
            vehicle_plate,
            country_id,
            province_id,
            municipality_id,
            neighborhood_id,
            address_details,
            image_from_dni,
            image_back_dni,
            image_plate,
            has_license,
            has_insurance,
        } = req.body;
        const response = await createDeliveryApplication(
            id,
            user_id,
            full_name,
            dni_number,
            phone_number,
            email,
            vehicle_type,
            vehicle_brand,
            vehicle_model,
            vehicle_plate,
            country_id,
            province_id,
            municipality_id,
            neighborhood_id,
            address_details,
            image_from_dni,
            image_back_dni,
            image_plate,
            has_license,
            has_insurance
        );
        return res
            .status(response ? 201 : 200)
            .json({ data: req.body, message: response ? "Delivery Application Created" : "Delivery Application Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDeliveryApplicationsController = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await getDeliveryApplications(userId);
        return res.json({
            data: response.length > 0 ? response : null,
            message: response.length > 0 ? "Delivery Applications Found" : "Delivery Applications Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getDeliveryApplicationByApplicationIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await getDeliveryApplicationByApplicationId(id);
        return res.json({
            data: response.length > 0 ? response[0] : null,
            message: response.length > 0 ? "Delivery Application Found" : "Delivery Application Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
