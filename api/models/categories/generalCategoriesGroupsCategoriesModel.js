import connection from "../../connection.js";

export const createGeneralCategoryGroupCategory = async (id, general_category_group_id, id_category) => {
    const [rows] = await connection.execute(
        `INSERT INTO general_categories_groups_categories(id, general_category_group_id, id_category) VALUES(?, ?, ?)`,
        [id, general_category_group_id, id_category]
    );
    return rows.affectedRows;
};

export const updateGeneralCategoryGroupCategory = async (id, general_category_group_id, id_category) => {
    const [result] = await connection.execute(`UPDATE general_categories_groups SET general_category_group_id = ?, id_category = ? WHERE id = ?`, [
        general_category_group_id,
        id_category,
        id,
    ]);
    return result.affectedRows;
};

export const deleteGeneralCategoryGroupCategory = async (general_category_group_id, id_category) => {
    const [rows] = await connection.execute(
        `DELETE FROM general_categories_groups_categories WHERE general_category_group_id = ? AND id_category = ?;`,
        [general_category_group_id, id_category]
    );
    return rows.affectedRows > 0;
};
