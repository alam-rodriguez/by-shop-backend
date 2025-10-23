import connection from "../../connection.js";
// export const createArticleSpec = async (id, id_article, id_option, id_value, status, type) => {
//     const [rows] = await connection.execute(
//         `INSERT INTO articles_specs(id, id_article, id_option, id_value, status, type)
//       VALUES(?, ?, ?, ?, ?, ?);`,
//         [id, id_article, id_option, id_value, status, type]
//     );
//     return rows.affectedRows > 0;
// };
// export const updateArticleSpec = async (id, id_article, id_option, id_value, status, type) => {
//     const [rows] = await connection.execute(
//         `UPDATE articles_specs SET id_article = ?, id_option = ?, id_value = ?, status = ?, type = ? WHERE id = ?
//     `,
//         [id_article, id_option, id_value, status, type, id]
//     );
//     return rows.affectedRows > 0;
// };

export const createArticleSpec = async (id, id_article, id_option, id_value, is_spec, is_measurement, is_highlight, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO articles_specs(id, id_article, id_option, id_value, is_spec, is_measurement, is_highlight, status) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?);`,
        [id, id_article, id_option, id_value, is_spec, is_measurement, is_highlight, status]
    );
    return rows.affectedRows > 0;
};

// export const updateArticleSpec = async (id, id_article, id_option, id_value, is_spec, is_measurement, is_highlight, status) => {
//     const [rows] = await connection.execute(
//         `UPDATE articles_specs SET id_article = ?, id_option = ?, id_value = ?, is_spec = ?, is_measurement = ?, is_highlight = ?, status = ? WHERE id = ?
//     `,
//         [id, id_article, id_option, id_value, is_spec, is_measurement, is_highlight, status, id]
//     );
//     return rows.affectedRows > 0;
// };

export const updateArticleSpec = async (id, id_option, id_value, is_spec, is_measurement, is_highlight) => {
    const [rows] = await connection.execute(
        `UPDATE articles_specs SET id_option = ?, id_value = ?, is_spec = ?, is_measurement = ?, is_highlight = ? WHERE id = ?
    `,
        [id_option, id_value, is_spec, is_measurement, is_highlight, id]
    );
    return rows.affectedRows > 0;
};

export const deleteArticleSpec = async (idSpec) => {
    const [rows] = await connection.execute(
        `DELETE FROM articles_specs WHERE id = ?
    `,
        [idSpec]
    );
    return rows.affectedRows > 0;
};

export const getArticleSpecs = async (idArticle) => {
    const [rows] = await connection.execute(
        `SELECT * FROM articles_specs WHERE id_article = ?
    `,
        [idArticle]
    );
    return rows;
};
