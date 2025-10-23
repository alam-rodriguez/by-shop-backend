import connection from "../../connection.js";

export const getOptionCategories = async () => {
    const [rows] = await connection.execute("SELECT * FROM options_categories");
    return rows;
};

export const createOptionCategory = async (id, name, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO options_categories(id, name, status)
        VALUES(?, ?, ?);`,
        [id, name, status]
    );
    return rows.affectedRows > 0;
};

export const updateOptionCategory = async (id, name, status) => {
    const [rows] = await connection.execute(`UPDATE options_categories SET name = ?, status = ? WHERE id = ?`, [name, status, id]);
    return rows.affectedRows > 0;
};

export const getOptionCategoryById = async (id) => {
    const [rows] = await connection.execute(`SELECT * FROM options_categories WHERE id = ? LIMIT 1`, [id]);
    return rows;
};
