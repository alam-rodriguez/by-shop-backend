import connection from "../../connection.js";

export const getBrands = async () => {
    const [rows] = await connection.execute("SELECT * FROM brands");
    return rows;
};

export const createBrand = async (id, name, description, image, status, created_date) => {
    const [rows] = await connection.execute(`INSERT INTO brands(id, name, description, image, status, created_date) VALUES(?, ?, ?, ?, ?, ?)`, [
        id,
        name,
        description,
        image,
        status,
        created_date,
    ]);
    return rows.affectedRows;
};

export const updateBrand = async (id, name, description, image, status) => {
    const [result] = await connection.execute(`UPDATE brands SET name = ?, description = ?, image = ?, status = ? WHERE id = ?`, [
        name,
        description,
        image,
        status,
        id,
    ]);
    return result.affectedRows;
};

export const getBrandById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM brands WHERE id = ?", [id]);
    return rows;
};
