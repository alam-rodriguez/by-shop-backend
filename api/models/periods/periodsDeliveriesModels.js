import connection from "../../connection.js";

export const createPeriodDeliveryPayout = async (
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
) => {
    const [rows] = await connection.execute(
        `INSERT INTO delivery_payouts(id, period_id, driver_id, orders_count, gross_amount, commission, net_amount, status, currency_id, paid_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, period_id, driver_id, orders_count, gross_amount, commission, net_amount, status, currency_id, paid_at]
    );
    return rows.affectedRows > 0;
};

export const deliveryPeriodPayout = async (period_id, driver_id) => {
    const [rows] = await connection.execute(`SELECT * FROM delivery_payouts WHERE period_id = ? AND driver_id = ? LIMIT 1;`, [period_id, driver_id]);
    return rows;
};
