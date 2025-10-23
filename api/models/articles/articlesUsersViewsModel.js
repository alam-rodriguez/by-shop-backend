import connection from "../../connection.js";

export const createUserArticleView = async (id, id_user, id_article, id_article_direct_category) => {
    const [rows] = await connection.execute(
        `INSERT INTO users_articles_views(id, id_user, id_article, id_article_direct_category) 
      VALUES(?, ?, ?, ?);`,
        [id, id_user, id_article, id_article_direct_category]
    );
    return rows.affectedRows > 0;
};

// export const getUserArticlesViews = async (id_user) => {
//     const [rows] = await connection.execute(
//         `SELECT
//           uav.*,
//           a.id AS id_article,
//           a.main_image AS image_article,
//           a.id_direct_category AS id_article_direct_category,
//           COUNT(a.id) AS views
//         FROM users_articles_views uav
//         LEFT JOIN articles a ON (a.id = uav.id_article)
//         WHERE uav.id_user = ?
//         GROUP BY uav.id_article_direct_category, uav.id
//         ORDER BY uav.created_at DESC
//         LIMIT 6
//       `,
//         [id_user]
//     );
//     return rows;
// };

export const getUserArticlesViews = async (id_user) => {
    const [rows] = await connection.execute(
        `WITH ranked_views AS (
          SELECT 
            uav.id,
            uav.created_at,
            uav.id_user,
            a.id AS id_article,
            a.main_image AS image_article,
            a.id_direct_category AS id_article_direct_category,
            c.name AS category_name,
            ROW_NUMBER() OVER (PARTITION BY a.id_direct_category ORDER BY uav.created_at DESC) AS rn
          FROM users_articles_views uav
          LEFT JOIN articles a ON a.id = uav.id_article
          LEFT JOIN categories c ON c.id = a.id_direct_category
          WHERE uav.id_user = ?
        ),
        views_count AS (
          SELECT 
            a.id_direct_category AS id_article_direct_category,
            c.name AS category_name,
            COUNT(*) AS views
          FROM users_articles_views uav
          LEFT JOIN articles a ON a.id = uav.id_article
          LEFT JOIN categories c ON c.id = a.id_direct_category
          WHERE uav.id_user = ?
          GROUP BY a.id_direct_category
        )
        SELECT 
          rv.id_article_direct_category,
          rv.id_article,
          rv.category_name,
          rv.image_article,
          rv.created_at,
          vc.views
        FROM ranked_views rv
        JOIN views_count vc ON vc.id_article_direct_category = rv.id_article_direct_category
        WHERE rv.rn = 1
        ORDER BY rv.created_at DESC
        LIMIT 6;
      `,
        [id_user, id_user]
    );
    return rows;
};
