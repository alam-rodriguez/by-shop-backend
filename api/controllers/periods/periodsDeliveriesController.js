// Models
import { createPeriodDeliveryPayout, deliveryPeriodPayout } from "../../models/periods/periodsDeliveriesModels.js";

export const createPeriodDeliveryPayoutController = async (req, res) => {
    try {
        const { id, period_id, driver_id, orders_count, gross_amount, commission, net_amount, status, currency_id, paid_at } = req.body;
        const periodPayout = await deliveryPeriodPayout(period_id, driver_id);
        if (periodPayout.length > 0) return res.json({ data: req.body, message: "This Delivery Was Payout For The Period" });
        const response = await createPeriodDeliveryPayout(
            id,
            period_id,
            driver_id,
            orders_count,
            gross_amount,
            commission,
            net_amount,
            status,
            currency_id,
            paid_at
        );
        return res.status(response ? 201 : 200).json({ data: req.body, message: response ? "Period Payout Created" : "Period Payout Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
