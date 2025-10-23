import connection from "../../connection.js";

export const createArticleHighlightedParagraph = async (id, id_article, paragraph, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO article_highlighted_paragraphs(id, id_article, paragraph, status) 
      VALUES(?, ?, ?, ?);`,
        [id, id_article, paragraph, status]
    );
    return rows.affectedRows > 0;
};

// export const updateArticleHighlightedParagraph = async (id, id_article, paragraph, status) => {
//     const [rows] = await connection.execute(
//         `UPDATE article_highlighted_paragraphs SET id_article = ?, paragraph = ?, status = ? WHERE id = ?
//     `,
//         [id_article, paragraph, status, id]
//     );
//     return rows.affectedRows > 0;
// };

export const updateArticleHighlightedParagraph = async (id, paragraph) => {
    const [rows] = await connection.execute(
        `UPDATE article_highlighted_paragraphs SET paragraph = ? WHERE id = ?
    `,
        [paragraph, id]
    );
    return rows.affectedRows > 0;
};

export const deleteArticleHighlightedParagraph = async (idArticleHighlightedParagraph) => {
    const [rows] = await connection.execute(
        `DELETE FROM article_highlighted_paragraphs WHERE id = ?
    `,
        [idArticleHighlightedParagraph]
    );
    return rows.affectedRows > 0;
};

export const getArticleHighlightedParagraphs = async (idArticle) => {
    const [rows] = await connection.execute(
        `SELECT * FROM article_highlighted_paragraphs WHERE id_article = ?
    `,
        [idArticle]
    );
    return rows;
};
