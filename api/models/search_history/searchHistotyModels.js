import connection from "../../connection.js";

export const createSearchHistory = async (id, id_user, id_article, seeker_phrase) => {
    const [rows] = await connection.execute(`INSERT INTO search_history(id, id_user, id_article, seeker_phrase) VALUES(?, ?, ?, ?)`, [
        id,
        id_user,
        id_article,
        seeker_phrase,
    ]);
    return rows.affectedRows;
};

export const getSearchHistoryByIdUser = async (id_user) => {
    const [rows] = await connection.execute(
        `
      SELECT
          sh.id_article,
          sh.id,
          a.name AS name_article
      FROM search_history AS sh
      LEFT JOIN articles AS a on a.id = sh.id_article
      WHERE sh.id_user = ? AND sh.status = 1 
      ORDER BY sh.created_at DESC
      LIMIT 6
      `,
        [id_user]
    );
    return rows;
};

export const updateSearchHistoryStatus = async (id, status) => {
    const [rows] = await connection.execute(`UPDATE search_history SET status = ? WHERE id = ?`, [status, id]);
    return rows.affectedRows;
};
