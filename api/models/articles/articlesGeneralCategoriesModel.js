import connection from "../../connection.js";

export const createArticleGeneralCategory = async (id, id_article, id_general_category, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO articles_general_categories(id, id_article, id_general_category, status) 
      VALUES(?, ?, ?, ?);`,
        [id, id_article, id_general_category, status]
    );
    return rows.affectedRows > 0;
};

export const deleteArticleGeneralCategory = async (id_article, id_general_category) => {
    const [rows] = await connection.execute(
        `DELETE FROM articles_general_categories WHERE id_article = ? AND id_general_category = ?;`,
        [id_article, id_general_category]
    );
    return rows.affectedRows > 0;
};

export const updateArticleGeneralCategory = async (id, id_article, id_general_category, status) => {
    const [rows] = await connection.execute(
        `UPDATE articles_general_categories SET id_article = ?, id_general_category = ?, status = ? WHERE id = ?
    `,
        [id_article, id_general_category, status, id]
    );
    return rows.affectedRows > 0;
};
