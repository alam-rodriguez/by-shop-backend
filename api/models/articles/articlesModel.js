import connection from "../../connection.js";

export const getArticles = async () => {
    const [rows] = await connection.execute("SELECT * FROM articles");
    return rows;
};

export const getArticlesFromShop = async (idShop) => {
    const [rows] = await connection.execute("SELECT * FROM articles WHERE id_shop = ?", [idShop]);
    return rows;
};

export const getArticleById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM articles WHERE id = ?", [id]);
    return rows[0];
};

export const createArticle = async (
    id,
    name,
    description,
    slug,
    main_image,
    id_direct_category,
    id_indirect_category,
    id_model,
    id_payment_method,
    status,
    view,
    id_currency,
    price,
    quantity,
    id_shop,
    additional_details,
    created_date
) => {
    const [rows] = await connection.execute(
        `INSERT INTO articles(id, name, description, slug, main_image, id_direct_category, id_indirect_category, id_model, id_payment_method, status, view, id_currency, price, quantity, id_shop, additional_details, created_date) 
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
            id,
            name,
            description,
            slug,
            main_image,
            id_direct_category,
            id_indirect_category,
            id_model,
            id_payment_method,
            status,
            view,
            id_currency,
            price,
            quantity,
            id_shop,
            additional_details,
            created_date,
        ]
    );
    return rows.affectedRows > 0;
};

export const updateArticle = async (
    id,
    name,
    description,
    slug,
    main_image,
    id_direct_category,
    id_indirect_category,
    id_model,
    id_payment_method,
    status,
    view,
    id_currency,
    price,
    quantity
) => {
    const [rows] = await connection.execute(
        `UPDATE articles SET name = ?, description = ?, slug = ?, main_image = ?, id_direct_category = ?, id_indirect_category = ?, id_model = ?, id_payment_method = ?, status = ?, view = ?, id_currency = ?, price = ?, quantity = ? WHERE id = ?
    `,
        [
            name,
            description,
            slug,
            main_image,
            id_direct_category,
            id_indirect_category,
            id_model,
            id_payment_method,
            status,
            view,
            id_currency,
            price,
            quantity,
            id,
        ]
    );
    return rows.affectedRows > 0;
};

export const getArticlesOfGroupCategoryId = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            c.id,
            c.name,
            c.slug,
            c.description,
            c.image
        FROM categories c
        INNER JOIN general_categories_groups_categories gcgc ON gcgc.id_category = c.id
        WHERE gcgc.general_category_group_id = '${id}' AND c.status = 1 AND c.type = 3 AND c.view = 1
    `);
    return rows;
};

export const getArticlesOfGeneralCategoryGroupForApp = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            a.*,
            GROUP_CONCAT(DISTINCT oa.color SEPARATOR ',') AS colors
        FROM articles a
        INNER JOIN articles_general_categories agc ON (a.id = agc.id_article)
        INNER JOIN general_categories_groups_categories gcgc ON gcgc.id_category = agc.id_general_category
        INNER JOIN categories c ON (c.id = gcgc.id_category)
        LEFT JOIN options_articles oa ON (oa.id_article = a.id)
        LEFT JOIN options o ON (o.id = oa.id_option AND o.type = 3)
        WHERE a.status = 1 AND gcgc.general_category_group_id = '${id}'
        GROUP BY a.id
        ORDER BY created_date DESC;
    `);
    return rows;
};

// SELECT
//             a.*,
//             GROUP_CONCAT(DISTINCT ia.image SEPARATOR ',') AS images
//             GROUP_CONCAT(DISTINCT oa.color SEPARATOR ',') AS colors
//         FROM articles a
//         LEFT JOIN images_articles ia ON (ia.id_article = a.id)
//         LEFT JOIN options_articles oa ON (oa.id_article = a.id)
//         LEFT JOIN options o ON (o.id = oa.id_option AND o.type = 3)
//         WHERE a.status = 1 AND a.id = '${id}'
//         GROUP BY a.id

// export const getArticleByIdForApp = async (id) => {
//     const [rows] = await connection.execute(`SELECT
//             a.*,
//             GROUP_CONCAT(DISTINCT ia.image SEPARATOR ',') AS images,
//             JSON_ARRAYAGG(
//                 JSON_OBJECT(
//                     'id', oa.id,
//                     'option', o.name,
//                     'id_option', o.id,
//                     'value', ov.value,
//                     'id_value', ov.id,
//                     'image', oa.image,
//                     'price', oa.price,
//                     'color', oa.color
//                 )
//             ) AS options
//         FROM articles a
//         LEFT JOIN images_articles ia ON (ia.id_article = a.id)
//         LEFT JOIN options_articles oa ON (oa.id_article = a.id)
//         LEFT JOIN options o ON (o.id = oa.id_option)
//         LEFT JOIN options_values ov ON (ov.id = oa.id_value)
//         WHERE a.status = 1 AND a.id = '${id}'
//         GROUP BY a.id
//     `);
//     return rows;
// };
// export const getArticleByIdForApp = async (id) => {
//     const [rows] = await connection.execute(`SELECT
//             a.*,
//             GROUP_CONCAT(DISTINCT ia.image SEPARATOR ',') AS images,
//             COALESCE(
//                 MAX(oa.percent_discount),           -- Descuento del artículo
//                 MAX(oc1.percent_discount),          -- Descuento de la categoría directa
//                 MAX(oc2.percent_discount),          -- Descuento de la categoría indirecta
//                 MAX(oc3.percent_discount),          -- Descuento de las categorías generales
//                 0                                   -- Si no tiene ninguno, 0
//             ) AS discount_percent,
//             COALESCE(
//                 MAX(oa_offer.name),
//                 MAX(oc1_offer.name),
//                 MAX(oc2_offer.name),
//                 MAX(oc3_offer.name)
//             ) AS offer_name

//         FROM articles a
//         LEFT JOIN images_articles ia ON (ia.id_article = a.id)
//         LEFT JOIN offers_articles oa ON (oa.id_article = a.id)
//         LEFT JOIN offers oa_offer ON (oa_offer.id = oa.id_offer)
//         LEFT JOIN offers o ON (o.id = oa.id_offer)
//         LEFT JOIN offers_categories oc1 ON (oc1.id = a.id_direct_category)
//         LEFT JOIN offers oc1_offer ON (oc1_offer.id = oc1.id_offer)
//         LEFT JOIN offers_categories oc2 ON (oc2.id = a.id_indirect_category)
//         LEFT JOIN offers oc2_offer ON (oc2_offer.id = oc2.id_offer)
//         LEFT JOIN articles_general_categories agc ON (agc.id_article = a.id)
//         LEFT JOIN offers_categories oc3 ON (oc3.id = agc.id_general_category)
//         LEFT JOIN offers oc3_offer ON (oc3_offer.id = oc3.id_offer)

//         WHERE a.status = 1 AND a.id = '${id}'
//         GROUP BY a.id
//     `);
//     return rows;
// };
export const getArticleByIdForApp = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            a.*,
            GROUP_CONCAT(DISTINCT ia.image SEPARATOR ',') AS images,
            COALESCE(AVG(rating), 0) AS average_stars,
            COUNT(DISTINCT ar.id) AS total_reviews,
            s.name AS shop_name,
            s.name AS name_shop,
            s.logo AS shop_logo,
            s.id AS shop_id,
            COUNT(DISTINCT cbi.id) AS total_sales,
            JSON_OBJECT(
                'exchange_rate', cu.exchange_rate,
                'iso_code', cu.iso_code
            ) AS currency
            -- (
            --     CASE WHEN EXISTS (SELECT id FROM offers_articles oa WHERE oa.id_article = a.id AND )
            --     THEN (SELECT percent_discount FROM offers_articles oa WHERE oa.id_article = a.id LIMIT 1)
            --     END
            -- ) AS percent_discount,
            -- (
            --     CASE WHEN EXISTS (SELECT id FROM offers_articles oa WHERE oa.id_article = a.id)
            --     THEN (SELECT a.price * (1 - percent_discount / 100) FROM offers_articles oa WHERE oa.id_article = a.id LIMIT 1)
            --     END
            -- ) AS price_with_percent_discount
        FROM articles a
        LEFT JOIN images_articles ia ON (ia.id_article = a.id)
        LEFT JOIN articles_reviews ar ON (ar.id_article = a.id)
        LEFT JOIN shops s ON (s.id = a.id_shop)
        LEFT JOIN carts c ON (c.id_article = a.id AND c.status = 5)
        LEFT JOIN carts_bought_items cbi ON (cbi.id_cart = c.id AND cbi.status = 1)
        LEFT JOIN currencies AS cu ON(cu.id = a.id_currency)
        WHERE a.id = '${id}'
        GROUP BY a.id
    `);
    return rows;
};

// export const getArticleByIdForApp = async (id) => {
//     const [rows] = await connection.execute(`SELECT
//             a.*,
//             GROUP_CONCAT(DISTINCT ia.image SEPARATOR ',') AS images

//         FROM articles a
//         LEFT JOIN images_articles ia ON (ia.id_article = a.id)
//         LEFT JOIN offers_articles oa ON (oa.id_article = a.id)
//         LEFT JOIN offers oa_offer ON (oa_offer.id = oa.id_offer)
//         LEFT JOIN offers o ON (o.id = oa.id_offer)
//         LEFT JOIN offers_categories oc1 ON (oc1.id = a.id_direct_category)
//         LEFT JOIN offers oc1_offer ON (oc1_offer.id = oc1.id_offer)
//         LEFT JOIN offers_categories oc2 ON (oc2.id = a.id_indirect_category)
//         LEFT JOIN offers oc2_offer ON (oc2_offer.id = oc2.id_offer)
//         LEFT JOIN articles_general_categories agc ON (agc.id_article = a.id)
//         LEFT JOIN offers_categories oc3 ON (oc3.id = agc.id_general_category)
//         LEFT JOIN offers oc3_offer ON (oc3_offer.id = oc3.id_offer)

//         WHERE a.status = 1 AND a.id = '${id}'
//         GROUP BY a.id
//     `);
//     return rows;
// };

export const getArticleOffer = async (id) => {
    const [rows] = await connection.execute(
        `SELECT *
        FROM (
            -- 1. Oferta del artículo
            SELECT o.*, 1 AS prioridad
            FROM offers_articles oa
            JOIN offers o ON o.id = oa.id_offer
            WHERE oa.id_article = ?
            AND o.status = 1
            AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

            UNION ALL

            -- 2. Oferta de categoría directa
            SELECT o.*, 2 AS prioridad
            FROM articles a
            JOIN offers_categories oc ON oc.id_category = a.id_direct_category
            JOIN offers o ON o.id = oc.id_offer
            WHERE a.id = ?
            AND o.status = 1
            AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

            UNION ALL

            -- 3. Oferta de categoría indirecta
            SELECT o.*, 3 AS prioridad
            FROM articles a
            JOIN offers_categories oc ON oc.id_category = a.id_indirect_category
            JOIN offers o ON o.id = oc.id_offer
            WHERE a.id = ?
            AND o.status = 1
            AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

            UNION ALL

            -- 4. Oferta de categorías generales
            SELECT o.*, 4 AS prioridad
            FROM articles_general_categories agc
            JOIN offers_categories oc ON oc.id_category = agc.id_general_category
            JOIN offers o ON o.id = oc.id_offer
            WHERE agc.id_article = ?
            AND o.status = 1
            AND CURRENT_DATE BETWEEN o.date_start AND o.date_end
        ) AS ofertas
        ORDER BY prioridad
        LIMIT 1;
    `,
        [id, id, id, id]
    );
    return rows;
};

export const getArticleWithOffer = async (idCartBoughtItem, idOffer) => {
    const [rows] = await connection.execute(
        `SELECT 
            a.id,
            a.price,
            oa.percent_discount
        FROM carts_bought_items cbi
        LEFT JOIN carts c ON (c.id = cbi.id_cart)
        LEFT JOIN articles a ON (a.id = c.id_article)
        LEFT JOIN offers_articles oa ON (oa.id_article = a.id AND oa.id_offer = ?) 
        WHERE cbi.id = ?
        LIMIT 1;
    `,
        [idOffer, idCartBoughtItem]
    );
    return rows;
};

export const getArticleOptionsByIdForApp = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            oa.id,
            o.name AS 'option',
            o.id AS id_option,
            ov.value AS value,
            ov.id AS id_value,
            oa.image,
            oa.price,
            oa.color,
            o.type
        FROM options_articles oa
        LEFT JOIN options o ON (o.id = oa.id_option)
        LEFT JOIN options_values ov ON (ov.id = oa.id_value)
        WHERE oa.id_article = '${id}'
    `);
    return rows;
};

export const getBoxContentArticle = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            a.id,
            a.name,
            a.main_image,
            a.description
        FROM box_contents bc
        LEFT JOIN articles a ON a.id = bc.id_article_content
        WHERE bc.id_article = '${id}' AND a.status = 1 AND a.quantity > 0
    `);
    return rows;
};

export const getArticleSpecsByIdForApp = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            asp.id,
            o.name AS 'option',
            o.id AS id_option,
            ov.value AS value,
            ov.id AS id_value,
            asp.is_spec,
            asp.is_measurement,
            asp.is_highlight
        FROM articles_specs asp
        LEFT JOIN options o ON (o.id = asp.id_option)
        LEFT JOIN options_values ov ON (ov.id = asp.id_value)
        WHERE asp.id_article = '${id}' AND asp.is_spec = 1
    `);
    return rows;
};

export const getArticleFeaturedSpecsByIdForApp = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            asp.id,
            o.name AS 'option',
            o.id AS id_option,
            ov.value AS value,
            ov.id AS id_value
        FROM articles_specs asp
        LEFT JOIN options o ON (o.id = asp.id_option)
        LEFT JOIN options_values ov ON (ov.id = asp.id_value)
        WHERE asp.id_article = '${id}' AND asp.is_highlight = 1
    `);
    return rows;
};

export const getArticleMeasurementsByIdForApp = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            asp.id,
            o.name AS 'option',
            o.id AS id_option,
            ov.value AS value,
            ov.id AS id_value
        FROM articles_specs asp
        LEFT JOIN options o ON (o.id = asp.id_option)
        LEFT JOIN options_values ov ON (ov.id = asp.id_value)
        WHERE asp.id_article = '${id}' AND asp.is_measurement = 1
    `);
    return rows;
};

export const addArticleToListUset = async (id, id_user, id_article, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO articles_list_users(id, id_user, id_article, status) 
      VALUES(?, ?, ?, ?);`,
        [id, id_user, id_article, status]
    );
    return rows.affectedRows > 0;
};

export const checkArticlesIsInList = async (id_user, id_article) => {
    const [rows] = await connection.execute("SELECT * FROM articles_list_users WHERE id_user = ? AND id_article = ? LIMIT 1", [id_user, id_article]);
    return rows;
};

export const updateArticlesInListStatus = async (id, status) => {
    const [rows] = await connection.execute("UPDATE articles_list_users SET status = ? WHERE id = ?", [status, id]);
    return rows.affectedRows > 0;
};

export const getArticlesInUserList = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            alu.*,
            a.id AS id_article,
            a.main_image AS image_article
        FROM articles_list_users alu
        LEFT JOIN articles a ON (a.id = alu.id_article)
        WHERE alu.id_user = '${id}' AND alu.status = 1 AND a.status = 1
    `);
    return rows;
};

export const getArticlesFromDirectCategoriesForApp = async (id_category) => {
    const [rows] = await connection.execute(`SELECT 
            a.*,
            COALESCE(AVG(rating), 0) AS average_stars,
            COUNT(DISTINCT ar.id) AS total_reviews,
            JSON_OBJECT(
                'exchange_rate', cu.exchange_rate,
                'iso_code', cu.iso_code
            ) AS currency
        FROM articles a
        LEFT JOIN articles_reviews ar ON (ar.id_article = a.id)
        LEFT JOIN currencies AS cu ON(cu.id = a.id_currency)
        WHERE a.id_direct_category = '${id_category}' AND a.status = 1
        GROUP BY a.id
    `);
    return rows;
};

export const getArticlesFromGeneralCategoryForApp = async (id_category) => {
    const [rows] = await connection.execute(
        `SELECT 
            a.*
        FROM articles_general_categories agc
        LEFT JOIN articles a ON (a.id = agc.id_article)
        LEFT JOIN categories c ON (c.id = agc.id_general_category)
        WHERE agc.id_general_category = ? AND a.status = 1 AND agc.status = 1 AND c.type = 3 AND c.status = 1
    `,
        [id_category]
    );
    return rows;
};

export const articleFinder = async (word) => {
    const [rows] = await connection.execute("SELECT id, name FROM articles WHERE name LIKE ? LIMIT 6", [`%${word}%`]);
    return rows;
};

// export const getArticlesFromGeneralCategoryWithoutArticle = async (id_category, id_article) => {
//     const [rows] = await connection.execute(
//         `SELECT
//             a.*
//         FROM articles_general_categories agc
//         LEFT JOIN articles a ON (a.id = agc.id_article)
//         LEFT JOIN categories c ON (c.id = agc.id_general_category)
//         WHERE agc.id_general_category = ? AND a.status = 1 AND agc.status = 1 AND c.type = 3 AND c.status = 1 AND a.id != ?
//     `,
//         [id_category, id_article]
//     );
//     return rows;
// };

export const getArticlesCanBeInterested = async (id_article) => {
    const [rows] = await connection.execute(
        `SELECT a.*
            FROM articles a
            JOIN (
                SELECT name FROM articles WHERE id = ?
            ) AS target_article ON 1=1
            WHERE (a.name LIKE CONCAT('%', target_article.name, '%') OR a.description LIKE CONCAT('%', target_article.name, '%')) AND a.status = 1 AND a.id != ?
    `,
        [id_article, id_article]
    );
    return rows;
};

export const getArticlesSimilar = async (id_article) => {
    const [rows] = await connection.execute(
        `SELECT 
                a.*,
                COALESCE(AVG(rating), 0) AS average_stars,
                COUNT(DISTINCT cbi.id) AS total_sales
                -- COUNT(DISTINCT ar.id) AS total_reviews
            FROM articles a  
            JOIN (
                SELECT id_direct_category FROM articles WHERE id = ?
            ) AS target_article ON 1=1
            LEFT JOIN articles_reviews ar ON (ar.id_article = a.id)
            LEFT JOIN carts c ON (c.id_article = a.id AND c.status = 5)
            LEFT JOIN carts_bought_items cbi ON (cbi.id_cart = c.id AND cbi.status = 1)
            WHERE a.id_direct_category = target_article.id_direct_category AND a.status = 1 AND a.id != ?
            GROUP BY a.id
    `,
        [id_article, id_article]
    );
    return rows;
};

export const getArticlesOtherImages = async (id_article) => {
    const [rows] = await connection.execute(
        `SELECT 
                ia.*
            FROM images_articles ia
            WHERE ia.id_article = ?
    `,
        [id_article]
    );
    return rows;
};

export const getArticleByIdCart = async (idCart) => {
    const [rows] = await connection.execute(
        `SELECT 
            a.*,
            c.status AS status_cart,
            cbi.created_at AS created_at_cart
        FROM carts c
        LEFT JOIN articles a ON (a.id = c.id_article)
        LEFT JOIN carts_bought_items cbi ON (cbi.id_cart = c.id)
        WHERE c.id = ?
        GROUP BY c.id, cbi.id
        LIMIT 1
    `,
        [idCart]
    );
    return rows;
};

export const changeArticleQuantity = async (id, quantity) => {
    const [rows] = await connection.execute(
        `UPDATE articles SET quantity = ? WHERE id = ?
    `,
        [quantity, id]
    );
    return rows.affectedRows > 0;
};

export const getArticlesByShopId = async (idShop) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            a.*,
            JSON_OBJECT(
                'exchange_rate', cu.exchange_rate,
                'iso_code', cu.iso_code
            ) AS currency
        FROM articles AS a 
        LEFT JOIN currencies AS cu ON(cu.id = a.id_currency)
        WHERE a.id_shop = ? AND a.status = 1
    `,
        [idShop]
    );
    return rows;
};

export const getArticlesFromHomeCategoryForApp = async (home_category_id) => {
    const [rows] = await connection.execute(
        `SELECT 
            a.*,
            JSON_OBJECT(
                'exchange_rate', cu.exchange_rate,
                'iso_code', cu.iso_code
            ) AS currency
        FROM home_category_store hcs
        LEFT JOIN articles a ON (a.id = hcs.store_id)
        LEFT JOIN currencies AS cu ON(cu.id = a.id_currency)
        WHERE hcs.home_category_id = ? AND a.status = 1 AND hcs.status = 1 AND a.status = 1
        ORDER BY hcs.top DESC
    `,
        [home_category_id]
    );
    return rows;
};
