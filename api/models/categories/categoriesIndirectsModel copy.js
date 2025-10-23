import connection from "../../connection.js";

export const getCategoriesIndirects = async () => {
    const [rows] = await connection.execute("SELECT * FROM indirect_category");
    return rows;
};

export const getCategoryIndirectById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM indirect_category WHERE id = ?", [id]);
    return rows[0];
};

export const createCategoryIndirect = async (id, slug, status, nombre, color, view, created_date) => {
    const [rows] = await connection.execute(
        `INSERT INTO indirect_category(id, slug, status, nombre, color, view, created_date)
        VALUES(?, ?, ?, ?, ?, ?, ?);`,
        [id, slug, status, nombre, color, view, created_date]
    );
    return rows.affectedRows > 0;
};

export const updateCategoryIndirect = async (id, status, nombre, color, view) => {
    const [rows] = await connection.execute(`UPDATE indirect_category SET status = ?, nombre = ?, color = ?, view = ? WHERE id = ?`, [
        status,
        nombre,
        color,
        view,
        id,
    ]);
    return rows.affectedRows > 0;
};

export const changeSlugCategoryIndirect = async (id, slug) => {
    const [rows] = await connection.execute(`UPDATE indirect_category SET slug = ? WHERE id = ?`, [slug, id]);
    return rows.affectedRows;
};

export const changeStatusCategoryIndirect = async (id, status) => {
    const [rows] = await connection.execute(`UPDATE indirect_category SET status = ? WHERE id = ?`, [status, id]);
    return rows.affectedRows > 0;
};
