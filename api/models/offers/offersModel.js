import connection from "../../connection.js";

export const getOffers = async () => {
    const [rows] = await connection.execute(
        `SELECT 
            o.id,
            o.name,
            o.description,
            o.percent_discount,
            o.image,
            o.date_start,
            o.date_end,
            o.status,
            o.created_at
          FROM offers o
        ;`
    );
    return rows;
};

export const getOffersByShopId = async (shop_id) => {
    const [rows] = await connection.execute(
        `SELECT 
            o.id,
            o.name,
            o.description,
            o.percent_discount,
            o.image,
            o.date_start,
            o.date_end,
            o.status,
            o.created_at
          FROM offers o
          WHERE o.shop_id = ?
        ;`,
        [shop_id]
    );
    return rows;
};

export const getOffer = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
            o.id,
            o.name,
            o.description,
            o.percent_discount,
            o.image,
            o.date_start,
            o.date_end,
            o.status,
            o.created_at,
            -- JSON_ARRAYAGG(
                -- JSON_OBJECT(
                    -- 'id', oc1.id,
                    -- 'id_category', oc1.id_category,
                    -- 'name', c1.name
                -- )
            -- ) AS direct_categories,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', oc.id,
                        'id_category', oc.id_category,
                        'name', c.name
                    )
                )
                FROM offers_categories oc
                LEFT JOIN categories c ON c.id = oc.id_category
                WHERE oc.id_offer = o.id AND oc.type_category = 1
            ), JSON_ARRAY()) AS direct_categories,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', oc.id,
                        'id_category', oc.id_category,
                        'name', c.name
                    )
                )
                FROM offers_categories oc
                LEFT JOIN categories c ON c.id = oc.id_category
                WHERE oc.id_offer = o.id AND oc.type_category = 2
            ), JSON_ARRAY()) AS indirect_categories,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', oc.id,
                        'id_category', oc.id_category,
                        'name', c.name
                    )
                )
                FROM offers_categories oc
                LEFT JOIN categories c ON c.id = oc.id_category
                WHERE oc.id_offer = o.id AND oc.type_category = 3
            ), JSON_ARRAY()) AS general_categories,
            COALESCE((
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', oa.id,
                        'id_article', oa.id_article,
                        'name', a.name
                    )
                )
                FROM offers_articles oa
                LEFT JOIN articles a ON a.id = oa.id_article
                WHERE oa.id_offer = o.id
            ), JSON_ARRAY()) AS articles
        FROM offers o
        WHERE o.id = ?
        GROUP BY o.id
        ;`,
        [id]
    );
    return rows;
};

export const createOffer = async (id, shop_id, name, description, percent_discount, image, date_start, date_end, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO offers(id, shop_id, name, description, percent_discount, image, date_start, date_end, status) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [id, shop_id, name, description, percent_discount, image, date_start, date_end, status]
    );
    return rows.affectedRows > 0;
};

export const updateOffer = async (id, shop_id, name, description, percent_discount, image, date_start, date_end, status) => {
    const [rows] = await connection.execute(
        `UPDATE offers SET shop_id = ?, name = ?, description = ?, percent_discount = ?, image = ?, date_start = ?, date_end = ?, status = ? WHERE id = ?;`,
        [shop_id, name, description, percent_discount, image, date_start, date_end, status, id]
    );
    return rows.affectedRows > 0;
};

export const createOfferCategory = async (id, id_offer, id_category, type_category, percent_discount, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO offers_categories(id, id_offer, id_category, type_category, percent_discount, status) 
      VALUES(?, ?, ?, ?, ?, ?);`,
        [id, id_offer, id_category, type_category, percent_discount, status]
    );
    return rows.affectedRows > 0;
};

export const updateOfferCategory = async (id, id_offer, id_category, type_category, percent_discount, status) => {
    const [rows] = await connection.execute(
        `UPDATE offers_categories SET id_offer = ?, id_category = ?, type_category = ?, percent_discount = ?, status = ? WHERE id = ?;`,
        [id_offer, id_category, type_category, percent_discount, status, id]
    );
    return rows.affectedRows > 0;
};

export const deleteOfferCategory = async (idOffer, idCategory) => {
    const [rows] = await connection.execute(`DELETE FROM offers_categories WHERE id_offer = ? AND id_category = ?;`, [idOffer, idCategory]);
    return rows.affectedRows > 0;
};

export const createOfferArticle = async (id, id_offer, id_article, percent_discount, price, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO offers_articles(id, id_offer, id_article, percent_discount, price, status) 
      VALUES(?, ?, ?, ?, ?, ?);`,
        [id, id_offer, id_article, percent_discount, price, status]
    );
    return rows.affectedRows > 0;
};

export const updateOfferArticle = async (id, id_offer, id_article, percent_discount, price, status) => {
    const [rows] = await connection.execute(
        `UPDATE offers_articles SET id_offer = ?, id_article = ?, percent_discount = ?, price = ?, status = ? WHERE id = ?;`,
        [id_offer, id_article, percent_discount, price, status, id]
    );
    return rows.affectedRows > 0;
};

export const deleteOfferArticle = async (idOffer, idArticle) => {
    const [rows] = await connection.execute(`DELETE FROM offers_articles WHERE id_offer = ? AND id_article = ?;`, [idOffer, idArticle]);
    return rows.affectedRows > 0;
};

export const createOfferArticleOption = async (id, id_offer_article, id_option, id_value, percent_discount, price, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO offers_articles_options(id, id_offer_article, id_option, id_value, percent_discount, price, status) 
      VALUES(?, ?, ?, ?, ?, ?, ?);`,
        [id, id_offer_article, id_option, id_value, percent_discount, price, status]
    );
    return rows.affectedRows > 0;
};
export const updateOfferArticleOption = async (id, id_offer_article, id_option, id_value, percent_discount, price, status) => {
    const [rows] = await connection.execute(
        `UPDATE offers_articles_options SET id_offer_article = ?, id_option = ?, id_value = ?, percent_discount = ?, price = ?, status = ? WHERE id = ?;`,
        [id_offer_article, id_option, id_value, percent_discount, price, status, id]
    );
    return rows.affectedRows > 0;
};
