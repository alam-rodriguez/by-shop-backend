import connection from "../../connection.js";

export const getUsersTypes = async () => {
    const [rows] = await connection.execute("SELECT * FROM user_types");
    return rows;
};

export const createUserType = async (id, name, description, status) => {
    const [rows] = await connection.execute("INSERT INTO user_types (id, name, description, status) VALUES(?, ?, ?, ?)", [
        id,
        name,
        description,
        status,
    ]);
    return rows.affectedRows > 0;
};
