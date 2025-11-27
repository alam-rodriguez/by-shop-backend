import connection from "../../connection.js";

export const createArticleReview = async (id, id_user, id_article, user_public_name, title, rating, comment, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO articles_reviews(id, id_user, id_article, user_public_name, title, rating, comment, status) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?);`,
        [id, id_user, id_article, user_public_name, title, rating, comment, status]
    );
    return rows.affectedRows > 0;
};

export const updateArticleReview = async (id, user_public_name, title, rating, comment, status) => {
    const [rows] = await connection.execute(
        `UPDATE articles_reviews SET user_public_name = ?, title = ?, rating = ?, comment = ?, status = ? WHERE id = ?;`,
        [user_public_name, title, rating, comment, status, id]
    );
    return rows.affectedRows > 0;
};

export const createArticleReviewOption = async (id, id_review, id_option, id_value, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO articles_reviews_options(id, id_review, id_option, id_value, status) 
      VALUES(?, ?, ?, ?, ?);`,
        [id, id_review, id_option, id_value, status]
    );
    return rows.affectedRows > 0;
};

export const createArticleReviewImage = async (id, id_review, image, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO articles_reviews_images(id, id_review, image, status) 
      VALUES(?, ?, ?, ?);`,
        [id, id_review, image, status]
    );
    return rows.affectedRows > 0;
};

export const deleteArticleReviewImage = async (ids) => {
    const placeholders = ids.map(() => "?").join(",");
    const [rows] = await connection.execute(`DELETE FROM articles_reviews_images WHERE id IN (${placeholders});`, ids);
    return rows.affectedRows > 0;
};

export const getArticleReviews = async (id_article) => {
    const [rows] = await connection.execute(
        `SELECT 
            ar.*,
            u.picture AS user_picture,
            COALESCE((
                SELECT JSON_ARRAYAGG(ari.image)
                FROM articles_reviews_images ari
                WHERE ari.id_review = ar.id AND ari.image IS NOT NULL
            ), JSON_ARRAY()) AS images,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'option', o.name,
                        'value', ov.value
                    )
                )
                FROM articles_reviews_options aro
                JOIN options o ON o.id = aro.id_option
                JOIN options_values ov ON ov.id = aro.id_value
                WHERE aro.id_review = ar.id
            ), JSON_ARRAY()) AS options
            -- JSON_ARRAYAGG(IF(ari.image IS NOT NULL, ari.image, NULL)) AS images
        FROM articles_reviews ar
        -- LEFT JOIN articles_reviews_images ari ON (ar.id = ari.id_review)
        LEFT JOIN articles_reviews_options aro ON (ar.id = aro.id_review)
        LEFT JOIN users u ON (u.id = ar.id_user)
        -- LEFT JOIN options o ON (o.id = co.id_option)
        -- LEFT JOIN options_values ov ON (aro.id_value = ov.id)
        WHERE ar.id_article = ? AND ar.status <> 0
        GROUP BY ar.id
        ORDER BY ar.created_at DESC;`,
        [id_article]
    );
    return rows;
};

export const getArticleReviewsByUserData = async (id_article) => {
    const [rows] = await connection.execute(
        `SELECT
            COUNT(id) AS total_reviews,
            IFNULL(AVG(rating), 0) AS average_rating
        FROM articles_reviews
        WHERE id_article = ? AND status <> 0
        `,
        [id_article]
    );
    return rows;
};

export const getRequestsReviews = async () => {
    const [rows] = await connection.execute(
        `SELECT 
            ar.*,
            COALESCE((
                SELECT JSON_ARRAYAGG(ari.image)
                FROM articles_reviews_images ari
                WHERE ari.id_review = ar.id AND ari.image IS NOT NULL
            ), JSON_ARRAY()) AS images,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'option', o.name,
                        'value', ov.value
                    )
                )
                FROM articles_reviews_options aro
                JOIN options o ON o.id = aro.id_option
                JOIN options_values ov ON ov.id = aro.id_value
                WHERE aro.id_review = ar.id
            ), JSON_ARRAY()) AS options
        FROM articles_reviews ar
        LEFT JOIN articles_reviews_options aro ON (ar.id = aro.id_review)
        WHERE ar.status = 1
        GROUP BY ar.id
        ORDER BY ar.created_at DESC
    ;`
    );
    return rows;
};

export const getRequestsReviewsByShop = async (idShop) => {
    const [rows] = await connection.execute(
        `SELECT 
            ar.*,
            COALESCE((
                SELECT JSON_ARRAYAGG(ari.image)
                FROM articles_reviews_images ari
                WHERE ari.id_review = ar.id AND ari.image IS NOT NULL
            ), JSON_ARRAY()) AS images,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'option', o.name,
                        'value', ov.value
                    )
                )
                FROM articles_reviews_options aro
                JOIN options o ON o.id = aro.id_option
                JOIN options_values ov ON ov.id = aro.id_value
                WHERE aro.id_review = ar.id
            ), JSON_ARRAY()) AS options,
            CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
            a.name AS article_name
        FROM articles_reviews ar 
        LEFT JOIN articles_reviews_options aro ON (ar.id = aro.id_review)
        INNER JOIN articles a ON (a.id = ar.id_article AND a.id_shop = ?)
        LEFT JOIN users u ON (u.id = ar.id_user)
        WHERE ar.status = 1
        GROUP BY ar.id
        ORDER BY ar.created_at DESC
    ;`,
        [idShop]
    );
    return rows;
};

export const getReviewById = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
            ar.*,
            COALESCE((
                SELECT JSON_ARRAYAGG(ari.image)
                FROM articles_reviews_images ari
                WHERE ari.id_review = ar.id AND ari.image IS NOT NULL
            ), JSON_ARRAY()) AS images,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'option', o.name,
                        'value', ov.value
                    )
                )
                FROM articles_reviews_options aro
                JOIN options o ON o.id = aro.id_option
                JOIN options_values ov ON ov.id = aro.id_value
                WHERE aro.id_review = ar.id
            ), JSON_ARRAY()) AS options
        FROM articles_reviews ar
        LEFT JOIN articles_reviews_options aro ON (ar.id = aro.id_review)
        WHERE ar.id = ?
        GROUP BY ar.id
        LIMIT 1
    ;`,
        [id]
    );
    return rows;
};

export const updateReviewStatus = async (id, status) => {
    const [rows] = await connection.execute(`UPDATE articles_reviews SET status = ? WHERE id = ?`, [status, id]);
    return rows.affectedRows > 0;
};
