import express from "express";
const router = express.Router();

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
// const app = express();
// app.use(express.json());

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API } = process.env;

/** 🔑 Obtener token de acceso de PayPal */
const generateAccessToken = async () => {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, "grant_type=client_credentials", {
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return response.data.access_token;
};

/** 🧾 Crear orden de pago */
router.post("/create-order", async (req, res) => {
    try {
        const { return_url, cancel_url } = req.body;
        const accessToken = await generateAccessToken();
        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: "50.00", // 💰 monto del pago
                        },
                    },
                ],
                application_context: {
                    return_url: return_url, // <--- aquí va la página de éxito en tu frontend
                    cancel_url: cancel_url, // <--- página si el usuario cancela
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

/** 💵 Capturar pago */
router.post("/capture-order/:orderId", async (req, res) => {
    try {
        const accessToken = await generateAccessToken();
        const { orderId } = req.params;
        const response = await axios.post(
            `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});

export default router;
