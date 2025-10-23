import connection from "../../connection.js";

export const getDepartmentsForApp = async () => {
    const [rows] = await connection.execute("SELECT * FROM departments WHERE status = 1 AND view = 1");
    return rows;
};
