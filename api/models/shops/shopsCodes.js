import connection from "../../connection.js";

export const getShopsCodes = async () => {
    const [rows] = await connection.execute("SELECT * FROM shops_codes");
    return rows;
};

export const getShopCodeById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM shops_codes WHERE id = ?", [id]);
    return rows;
};

export const createShopCode = async (id, shops_plans_id, status, code, used_at) => {
    const [rows] = await connection.execute("INSERT INTO shops_codes(id, shops_plans_id, status, code, used_at) VALUES (?, ?, ?, ?, ?)", [
        id,
        shops_plans_id,
        status,
        code,
        used_at,
    ]);
    return rows.affectedRows > 0;
};

export const updateShopCode = async (id, shops_plans_id, status, code, used_at) => {
    const [rows] = await connection.execute("UPDATE shops_codes SET shops_plans_id = ?, status = ?, code = ?, used_at = ? WHERE id = ?", [
        shops_plans_id,
        status,
        code,
        used_at,
        id,
    ]);
    return rows.affectedRows > 0;
};

export const setUseShopCode = async (id, used_by_shop_id) => {
    const [rows] = await connection.execute("UPDATE shops_codes SET status = 0, used_at = NOW(), used_by_shop_id = ? WHERE id = ?", [
        used_by_shop_id,
        id,
    ]);
    return rows.affectedRows > 0;
};

export const getDataShopCode = async (code) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            sp.*,
            sc.id AS shop_code_id 
        FROM shops_codes AS sc 
        LEFT JOIN shops_plans AS sp ON sc.shops_plans_id = sp.id
        WHERE sc.code = ? AND sc.status = 1`,
        [code]
    );
    return rows;
};
