import { createPeriod, getPeriodActive } from "../../models/periods/periodsModels.js";

export const createPeriodController = async (req, res) => {
    try {
        const { id, start_date, end_date, status } = req.body;
        const response = await createPeriod(id, start_date, end_date, status);
        return res.status(response ? 201 : 200).json({ data: req.body, message: response ? "Period Created" : "Period Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getPeriodActiveController = async (req, res) => {
    try {
        const response = await getPeriodActive();
        return res.json({
            data: response.length > 0 ? response[0] : null,
            message: response.length > 0 ? "Period Active Found" : "Period Active Not Found",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const getPeriodActiveController = async (req, res) => {
//     try {
//         const response = await getPeriodActive();
//         return res.json({
//             data: response.length > 0 ? response[0] : null,
//             message: response.length > 0 ? "Period Active Found" : "Period Active Not Found",
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// getPeriodActiveForShop;
