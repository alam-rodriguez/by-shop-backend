import connection from "../../connection.js";

export const getShopsPlans = async () => {
    const [rows] = await connection.execute("SELECT * FROM shops_plans");
    return rows;
};

export const getShopPlanById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM shops_plans WHERE id = ?", [id]);
    return rows;
};

export const createShopPlan = async (id, name, description, price, duration_days, commission_rate, status, rank) => {
    const [rows] = await connection.execute(
        "INSERT INTO shops_plans(id, name, description, price, duration_days, commission_rate, status, `rank`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [id, name, description, price, duration_days, commission_rate, status, rank]
    );
    return rows.affectedRows > 0;
};

export const updateShopPlan = async (id, name, description, price, duration_days, commission_rate, status, rank) => {
    const [rows] = await connection.execute(
        "UPDATE shops_plans SET name = ?, description = ?, price = ?, duration_days = ?, commission_rate = ?, status = ?, `rank` = ? WHERE id = ?",
        [name, description, price, duration_days, commission_rate, status, rank, id]
    );
    return rows.affectedRows > 0;
};
