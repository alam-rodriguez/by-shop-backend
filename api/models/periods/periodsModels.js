import connection from "../../connection.js";

export const createPeriod = async (id, start_date, end_date, status) => {
    const [rows] = await connection.execute(`INSERT INTO periods(id, start_date, end_date, status) VALUES(?, ?, ?, ?)`, [
        id,
        start_date,
        end_date,
        status,
    ]);
    return rows.affectedRows > 0;
};
