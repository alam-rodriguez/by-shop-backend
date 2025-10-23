// Connection
import connection from "../../connection.js";

export const getCurrencies = async () => {
    const [rows] = await connection.execute("SELECT * FROM currencies");
    return rows;
};

export const getCurrenciesForCustomers = async () => {
    const [rows] = await connection.execute("SELECT * FROM currencies WHERE status = 1");
    return rows;
};

export const getCurrenciesById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM currencies WHERE id = ? LIMIT 1", [id]);
    return rows;
};

export const createCurrency = async (id, name, description, exchange_rate, symbol, iso_code, main_currency, status) => {
    const [rows] = await connection.execute(
        "INSERT INTO currencies(id, name, description, exchange_rate, symbol, iso_code, main_currency, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", 
        [id, name, description, exchange_rate, symbol, iso_code, main_currency, status]
    );
    return rows.affectedRows > 0;
};

export const updateCurrency = async (id, name, description, exchange_rate, symbol, iso_code, main_currency, status) => {
    const [result] = await connection.execute(`UPDATE currencies SET name = ?, description = ?, exchange_rate = ?, symbol = ?, iso_code = ?, main_currency = ?, status = ? WHERE id = ?`, 
        [name, description, exchange_rate, symbol, iso_code, main_currency, status, id]
    );
    return result.affectedRows > 0;
};

export const getMainCurrency = async () => {
    const [rows] = await connection.execute("SELECT * FROM currencies WHERE main_currency = 1 LIMIT 1");
    return rows;
};

export const canMakeCurrencyMainCurrency = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM currencies WHERE id = ? AND main_currency = 1 LIMIT 1", [id]);
    return rows.length > 0;
};