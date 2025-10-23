import connection from "../../connection.js";

export const createArticleImage = async (id, id_article, image, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO images_articles(id, id_article, image, status) 
      VALUES(?, ?, ?, ?);`,
        [id, id_article, image, status]
    );
    return rows.affectedRows > 0;
};

// export const updateArticleImage = async (id, id_article, image, status) => {
//     const [rows] = await connection.execute(
//         `UPDATE images_articles SET id_article = ?, image = ?, status = ? WHERE id = ?
//     `,
//         [id_article, image, status, id]
//     );
//     return rows.affectedRows > 0;
// };

export const deleteArticleImage = async (id) => {
    const [rows] = await connection.execute(
        `DELETE FROM images_articles WHERE id = ?
    `,
        [id]
    );
    return rows.affectedRows > 0;
};

export const updateArticleImage = async (id, image) => {
    const [rows] = await connection.execute(
        `UPDATE images_articles SET image = ? WHERE id = ?
    `,
        [image, id]
    );
    return rows.affectedRows > 0;
};
