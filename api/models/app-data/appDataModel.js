import connection from "../../connection.js";

export const getAppData = async () => {
    const [rows] = await connection.execute("SELECT * FROM app_data");
    return rows;
};

export const createAppData = async (app_name, promotions_on_view, commissions) => {
    await connection.execute(`CREATE TABLE app_data(
    app_name VARCHAR(255) NOT NULL,
    promotions_on_view JSON,
    commissions JSON)
  `);
    const [result] = await connection.execute("INSERT INTO app_data(app_name, promotions_on_view, commissions) VALUES(?, ?, ?)", [
        app_name,
        promotions_on_view,
        commissions,
    ]);
    return result;
};

export const updateAppData = async (app_name, promotions_on_view, commissions) => {
    const [result] = await connection.execute("UPDATE app_data SET app_name = ?, promotions_on_view = ?, commissions = ?", [
        app_name,
        promotions_on_view,
        commissions,
    ]);
    return result;
};
