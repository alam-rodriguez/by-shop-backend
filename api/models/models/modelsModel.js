import connection from "../../connection.js";

export const getModels = async () => {
    const [rows] = await connection.execute(`SELECT 
            m.*,
            b.name AS name_brand
        FROM models m
        LEFT JOIN brands b ON m.id_brand = b.id
    `);
    return rows;
};

export const getModelById = async (id) => {
    const [rows] = await connection.execute(`SELECT * FROM models WHERE id = ? LIMIT 1`, [id]);
    return rows;
};

export const createModel = async (id, name, description, id_brand, image, status, created_date) => {
    const [rows] = await connection.execute(
        `INSERT INTO models(id, name, description, id_brand, image, status, created_date) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [id, name, description, id_brand, image, status, created_date]
    );
    return rows.affectedRows;
};

export const updateModel = async (id, name, description, id_brand, image, status) => {
    const [result] = await connection.execute(`UPDATE models SET name = ?, description = ?, id_brand = ?, image = ?, status = ? WHERE id = ?`, [
        name,
        description,
        id_brand,
        image,
        status,
        id,
    ]);
    return result.affectedRows;
};
