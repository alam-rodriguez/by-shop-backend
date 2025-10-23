import connection from "../../connection.js";

export const createArticleMeasurement = async (id, id_article, id_option, id_value, type, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO article_measurements(id, id_article, id_option, id_value, type, status) 
      VALUES(?, ?, ?, ?, ?, ?);`,
        [id, id_article, id_option, id_value, type, status]
    );
    return rows.affectedRows > 0;
};

export const updateArticleMeasurement = async (id, id_article, id_option, id_value, type, status) => {
    const [rows] = await connection.execute(
        `UPDATE article_measurements SET id_article = ?, id_option = ?, id_value = ?, type = ?, status = ? WHERE id = ?
    `,
        [id_article, id_option, id_value, type, status, id]
    );
    return rows.affectedRows > 0;
};
