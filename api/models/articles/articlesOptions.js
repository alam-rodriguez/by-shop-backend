import connection from "../../connection.js";

export const createArticleOption = async (id, id_article, id_option, id_value, image, price, quantity, color, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO options_articles(id, id_article, id_option, id_value, image, price, quantity, color, status) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [id, id_article, id_option, id_value, image, price, quantity, color, status]
    );
    return rows.affectedRows > 0;
};

// export const updateArticleOption = async (id, id_article, id_option, id_value, image, price, status) => {
//     const [rows] = await connection.execute(
//         `UPDATE options_articles SET id_article = ?, id_option = ?, id_value = ?, image = ?, price = ?, status = ? WHERE id = ?
//     `,
//         [id_article, id_option, id_value, image, price, status, id]
//     );
//     return rows.affectedRows > 0;
// };

export const updateArticleOption = async (id, id_value, image, price, quantity, color) => {
    const [rows] = await connection.execute(
        `UPDATE options_articles SET id_value = ?, image = ?, price = ?, quantity = ?, color = ? WHERE id = ?
    `,
        [id_value, image, price, quantity, color, id]
    );
    return rows.affectedRows > 0;
};

export const getArticleOptions = async (id_article) => {
    const [rows] = await connection.execute(
        `SELECT 
                oa.*,
                o.name AS 'option',
                o.type AS 'type',
                o.require_image AS require_image,
                o.require_color AS require_color,
                o.require_quantity AS require_quantity,
                o.require_price AS require_price,
                ov.value AS value
            FROM options_articles oa
            LEFT JOIN options o ON (o.id = oa.id_option)
            LEFT JOIN options_values ov ON (ov.id = oa.id_value)
            WHERE oa.id_article = ? AND oa.status = 1
    `,
        [id_article]
    );
    return rows;
};

export const deleteArticleOption = async (idArticleOption) => {
    const [rows] = await connection.execute(
        `DELETE FROM options_articles WHERE id = ?
    `,
        [idArticleOption]
    );
    return rows.affectedRows > 0;
};
