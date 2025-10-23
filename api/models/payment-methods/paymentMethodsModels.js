import connection from "../../connection.js";

export const getPaymentMethods = async () => {
    const [rows] = await connection.execute("SELECT * FROM payment_methods");
    return rows;
};

export const createPaymentMethod = async (id, name, description, type, require_image, status, bank_name, is_paypal_method, bank_account) => {
    const [rows] = await connection.execute(
        `INSERT INTO payment_methods(id, name, description, type, require_image, status, bank_name, is_paypal_method, bank_account) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, description, type, require_image, status, bank_name, is_paypal_method, bank_account]
    );
    return rows.affectedRows;
};

export const updatePaymentMethod = async (id, name, description, type, require_image, status, bank_name, is_paypal_method, bank_account) => {
    const [result] = await connection.execute(
        `UPDATE payment_methods SET name = ?, description = ?, type = ?, require_image = ?, status = ?, bank_name = ?, is_paypal_method = ?, bank_account = ? WHERE id = ?`,
        [name, description, type, require_image, status, bank_name, is_paypal_method, bank_account, id]
    );
    return result.affectedRows;
};

export const getPaymentMethodById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM payment_methods WHERE id = ? LIMIT 1", [id]);
    return rows;
};
