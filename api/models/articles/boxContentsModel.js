import connection from "../../connection.js";

export const createArticleBoxContent = async (id, id_article, id_article_content, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO box_contents(id, id_article, id_article_content, status) 
      VALUES(?, ?, ?, ?);`,
        [id, id_article, id_article_content, status]
    );
    return rows.affectedRows > 0;
};

export const updateArticleBoxContent = async (id, id_article, id_article_content, status) => {
    const [rows] = await connection.execute(
        `UPDATE box_contents SET id_article = ?, id_article_content = ?, status = ? WHERE id = ?
    `,
        [id_article, id_article_content, status, id]
    );
    return rows.affectedRows > 0;
};

export const deleteArticleBoxContent = async (idArticle, idArticleBoxContent) => {
    const [rows] = await connection.execute(`DELETE FROM box_contents WHERE id_article = ? AND id_article_content = ?`, [
        idArticle,
        idArticleBoxContent,
    ]);
    return rows.affectedRows > 0;
};

// export const getArticlesForBoxContent = async (idArticle) => {
//     const [rows] = await connection.execute(
//         `SELECT
//                 a.*
//             FROM articles a
//             WHERE a.id_shop = (SELECT id_shop FROM articles WHERE id = ?) AND a.id != ? AND a.status = 1 AND a.quantity > 0
//         `,
//         [idArticle, idArticle]
//     );
//     return rows;
// };

export const getArticlesForBoxContent = async (idShop, idArticle) => {
    const [rows] = await connection.execute(
        `SELECT 
                a.* 
            FROM articles a
            WHERE a.id_shop = ? AND a.id != ? AND a.status = 1 AND a.quantity > 0
        `,
        [idShop, idArticle]
    );
    return rows;
};
