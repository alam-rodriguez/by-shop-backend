import connection from "../../connection.js";

export const createCart = async (id, id_article, id_user, status, quantity) => {
    const [rows] = await connection.execute(`INSERT INTO carts(id, id_article, id_user, status, quantity) VALUES(?, ?, ?, ?, ?)`, [
        id,
        id_article,
        id_user,
        status,
        quantity,
    ]);
    return rows.affectedRows;
};

export const updateCart = async (id, id_article, id_user, status, quantity) => {
    const [result] = await connection.execute(`UPDATE carts SET id_article = ?, id_user = ?, status = ?, quantity = ? WHERE id = ?`, [
        id_article,
        id_user,
        status,
        quantity,
        id,
    ]);
    return result.affectedRows;
};

export const createCartItemOption = async (id, id_article, id_user, id_cart, id_article_option, status, id_option, id_value) => {
    const [rows] = await connection.execute(
        `INSERT INTO cart_item_options(id, id_article, id_user, id_cart, id_article_option, status, id_option, id_value) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, id_article, id_user, id_cart, id_article_option, status, id_option, id_value]
    );
    return rows.affectedRows;
};

export const getCartItemOptions = async (idCart) => {
    console.log(idCart);
    const [rows] = await connection.execute(
        `SELECT 
                *
        FROM cart_item_options
        WHERE id_cart = ?
        `,
        [idCart]
    );
    return rows;
};

export const updateCartItemOption = async (id, id_article, id_user, id_cart, status) => {
    const [result] = await connection.execute(`UPDATE cart_item_options SET id_article = ?, id_user = ?, id_cart = ?, status = ? WHERE id = ?`, [
        id_article,
        id_user,
        id_cart,
        status,
        id,
    ]);
    return result.affectedRows;
};

// -- GROUP_CONCAT(DISTINCT o.name SEPARATOR '/') AS options,
// -- GROUP_CONCAT(DISTINCT ov.name SEPARATOR '/') AS values

export const getCartUser = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
                c.id AS id,
                c.status AS status,
                c.quantity AS quantity,
                c.created_at AS created_at,
                a.id AS id_article,
                a.description AS description,
                a.name,
                a.price AS price,
                a.quantity AS stock,
                a.quantity AS article_quantity,
                a.main_image AS article_image,
                COALESCE(GROUP_CONCAT(DISTINCT o.name SEPARATOR '/'), '') AS options,
                COALESCE(GROUP_CONCAT(DISTINCT ov.value SEPARATOR '/'), '') AS 'values',
                COALESCE(SUM(oa.price), 0) AS price_options,
                cu.symbol,
                cu.exchange_rate,
                cu.iso_code,
                (
                    SELECT JSON_OBJECT(
                        'id', o.id,
                        'name', o.name,
                        'percent_discount', o.percent_discount,
                        'prioridad', o.prioridad,
                        'date_start', o.date_start,
                        'date_end', o.date_end
                    )
                    FROM (
                        SELECT o.id, o.name, o.percent_discount, 1 AS prioridad, o.date_start, o.date_end
                        FROM offers_articles oa
                        JOIN offers o ON o.id = oa.id_offer
                        WHERE oa.id_article = c.id_article AND (o.shop_id = a.id_shop OR o.shop_id IS NULL)
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

                        UNION ALL

                        SELECT o.id, o.name, o.percent_discount, 2 AS prioridad, o.date_start, o.date_end
                        FROM articles a2
                        JOIN offers_categories oc ON oc.id_category = a2.id_direct_category
                        JOIN offers o ON o.id = oc.id_offer
                        WHERE a2.id = c.id_article
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

                        UNION ALL

                        SELECT o.id, o.name, o.percent_discount, 3 AS prioridad, o.date_start, o.date_end
                        FROM articles a3
                        JOIN offers_categories oc ON oc.id_category = a3.id_indirect_category
                        JOIN offers o ON o.id = oc.id_offer
                        WHERE a3.id = c.id_article
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

                        UNION ALL

                        SELECT o.id, o.name, o.percent_discount, 4 AS prioridad, o.date_start, o.date_end
                        FROM articles_general_categories agc
                        JOIN offers_categories oc ON oc.id_category = agc.id_general_category
                        JOIN offers o ON o.id = oc.id_offer
                        WHERE agc.id_article = c.id_article
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end
                    ) o
                    ORDER BY prioridad ASC
                    LIMIT 1
                ) AS offer
        FROM carts c
        LEFT JOIN articles a ON (a.id = c.id_article)
        LEFT JOIN cart_item_options co ON (co.id_cart = c.id AND co.status = 1)
        LEFT JOIN options o ON (o.id = co.id_option)
        LEFT JOIN options_values ov ON (ov.id = co.id_value)
        LEFT JOIN options_articles oa ON (oa.id = co.id_article_option)
        LEFT JOIN currencies AS cu ON (cu.id = a.id_currency)
        WHERE c.id_user = ? AND c.status IN (1, 2) AND a.status =1
        GROUP BY c.id
        ORDER BY c.created_at DESC
        `,
        [id]
    );
    return rows;
};

export const updateCartItemStatus = async (id, status) => {
    const [result] = await connection.execute(`UPDATE carts SET status = ? WHERE id = ?`, [status, id]);
    return result.affectedRows;
};

export const updateCartItemQuantity = async (id, quantity) => {
    const [result] = await connection.execute(`UPDATE carts SET quantity = ? WHERE id = ?`, [quantity, id]);
    return result.affectedRows;
};

export const getCartItemsUserSavedForLater = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
                c.id AS id,
                c.status AS status,
                c.quantity AS quantity,
                c.created_at AS created_at,
                a.id AS id_article,
                a.description AS description,
                a.price AS price,
                a.quantity AS article_quantity,
                a.main_image AS article_image,
                COALESCE(GROUP_CONCAT(DISTINCT o.name SEPARATOR '/'), '') AS options,
                COALESCE(GROUP_CONCAT(DISTINCT ov.value SEPARATOR '/'), '') AS 'values',
                COALESCE(SUM(oa.price), 0) AS price_options
        FROM carts c
        LEFT JOIN articles a ON (a.id = c.id_article)
        LEFT JOIN cart_item_options co ON (co.id_cart = c.id AND co.status = 1)
        LEFT JOIN options o ON (o.id = co.id_option)
        LEFT JOIN options_values ov ON (ov.id = co.id_value)
        LEFT JOIN options_articles oa ON (oa.id = co.id_article_option)
        WHERE c.id_user = ? AND c.status = 3 AND a.status =1
        GROUP BY c.id
        ORDER BY c.created_at DESC
        `,
        [id]
    );
    return rows;
};

export const getCartItemsUserForBuy = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
                c.id AS id,
                c.status AS status,
                c.quantity AS quantity,
                c.created_at AS created_at,
                a.id AS id_article,
                a.name AS article_name,
                a.description AS description,
                a.price AS price,
                a.quantity AS article_quantity,
                a.main_image AS article_image,
                COALESCE(GROUP_CONCAT(DISTINCT o.name SEPARATOR '/'), '') AS options,
                COALESCE(GROUP_CONCAT(DISTINCT ov.value SEPARATOR '/'), '') AS 'values',
                COALESCE(SUM(oa.price), 0) AS price_options,
                cu.iso_code,
                cu.exchange_rate,
                (
                    SELECT JSON_OBJECT(
                        'id', o.id,
                        'name', o.name,
                        'percent_discount', o.percent_discount,
                        'prioridad', o.prioridad,
                        'date_start', o.date_start,
                        'date_end', o.date_end
                    )
                    FROM (
                        SELECT o.id, o.name, o.percent_discount, 1 AS prioridad, o.date_start, o.date_end
                        FROM offers_articles oa
                        JOIN offers o ON o.id = oa.id_offer
                        WHERE oa.id_article = c.id_article
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

                        UNION ALL

                        SELECT o.id, o.name, o.percent_discount, 2 AS prioridad, o.date_start, o.date_end
                        FROM articles a2
                        JOIN offers_categories oc ON oc.id_category = a2.id_direct_category
                        JOIN offers o ON o.id = oc.id_offer
                        WHERE a2.id = c.id_article
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

                        UNION ALL

                        SELECT o.id, o.name, o.percent_discount, 3 AS prioridad, o.date_start, o.date_end
                        FROM articles a3
                        JOIN offers_categories oc ON oc.id_category = a3.id_indirect_category
                        JOIN offers o ON o.id = oc.id_offer
                        WHERE a3.id = c.id_article
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end

                        UNION ALL

                        SELECT o.id, o.name, o.percent_discount, 4 AS prioridad, o.date_start, o.date_end
                        FROM articles_general_categories agc
                        JOIN offers_categories oc ON oc.id_category = agc.id_general_category
                        JOIN offers o ON o.id = oc.id_offer
                        WHERE agc.id_article = c.id_article
                        AND o.status = 1
                        AND CURRENT_DATE BETWEEN o.date_start AND o.date_end
                    ) o
                    ORDER BY prioridad ASC
                    LIMIT 1
                ) AS offer
        FROM carts c
        LEFT JOIN articles a ON (a.id = c.id_article)
        LEFT JOIN cart_item_options co ON (co.id_cart = c.id AND co.status = 1)
        LEFT JOIN options o ON (o.id = co.id_option)
        LEFT JOIN options_values ov ON (ov.id = co.id_value)
        LEFT JOIN options_articles oa ON (oa.id = co.id_article_option)
        LEFT JOIN currencies AS cu ON (cu.id = a.id_currency)
        WHERE c.id_user = ? AND c.status = 1 AND a.status =1
        GROUP BY c.id
        ORDER BY c.created_at DESC
        `,
        [id]
    );
    return rows;
};

export const createCartBuy = async (
    id,
    id_user,
    status,
    id_pay_method,
    total,
    total_discount,
    paypal_fee,
    paypal_payment_id,
    delivery_cost,
    delivery_distance,
    image,
    id_currency,
    want_use_address,
    id_address_user,
    id_shop_for_address
) => {
    const [rows] = await connection.execute(
        `INSERT INTO carts_bought(id, id_user, status, id_pay_method, total, total_discount, paypal_fee, paypal_payment_id, delivery_cost, delivery_distance, image, id_currency, want_use_address, id_address_user, id_shop_for_address) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            id_user,
            status,
            id_pay_method,
            total,
            total_discount,
            paypal_fee,
            paypal_payment_id,
            delivery_cost,
            delivery_distance,
            image,
            id_currency,
            want_use_address,
            id_address_user,
            id_shop_for_address,
        ]
    );
    return rows.affectedRows;
};

export const createCartBuyItem = async (
    id,
    id_cart_bought,
    id_cart,
    id_offer,
    percent_discount,
    price_item,
    price_options,
    quantity,
    status,
    total_price,
    total_price_with_discount
) => {
    const [rows] = await connection.execute(
        `INSERT INTO carts_bought_items(id, id_cart_bought, id_cart, id_offer, percent_discount, price_item, price_options, quantity, status, total_price, total_price_with_discount) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, id_cart_bought, id_cart, id_offer, percent_discount, price_item, price_options, quantity, status, total_price, total_price_with_discount]
    );
    return rows.affectedRows;
};

export const getCartBought = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
                cb.id AS id,
                -- c.id AS id_cart,
                cb.created_at AS fecha,
                cb.status AS status,
                cb.want_use_address AS want_use_address,
                cb.created_at AS created_at,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_article', a.id,
                        'article_image', a.main_image,
                        'id_cart', c.id
                    )
                ) AS articles
        FROM carts_bought cb
        LEFT JOIN carts_bought_items cbi ON (cbi.id_cart_bought = cb.id)
        LEFT JOIN carts c ON (c.id = cbi.id_cart)
        LEFT JOIN articles a ON (c.id_article = a.id)
        WHERE cb.id_user = ?
        GROUP BY cb.id
        ORDER BY cb.created_at DESC;
        `,
        [id]
    );
    return rows;
};

// export const createCart = async (id, id_article, id_user, status, quantity) => {
//     const [rows] = await connection.execute(`INSERT INTO carts(id, id_article, id_user, status, quantity) VALUES(?, ?, ?, ?, ?)`, [
//         id,
//         id_article,
//         id_user,
//         status,
//         quantity,
//     ]);
//     return rows.affectedRows;
// };

export const getLastCartItemBought = async (idUser, idArticle) => {
    const [rows] = await connection.execute(
        `SELECT 
                cbt.* 
            FROM carts_bought_items cbt
            LEFT JOIN carts_bought cb ON (cb.id = cbt.id_cart_bought)
            LEFT JOIN carts c ON (c.id = cbt.id_cart)
        WHERE cb.id_user = ? AND c.id_article = ?
        ORDER BY cbt.created_at DESC 
        LIMIT 1`,
        [idUser, idArticle]
    );
    return rows;
};

export const getArticleReviewUser = async (idUser, idArticle) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            ar.id,
            ar.user_public_name,
            ar.title,
            ar.rating,
            ar.comment,
            ar.id_article,
            ar.id_user,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'image', ari.image,
                    'id', ari.id
                )
            ) AS images
            -- JSON_ARRAYAGG(ari.image) AS images
        FROM articles_reviews AS ar
        LEFT JOIN articles_reviews_images AS ari ON(ari.id_review = ar.id)
        WHERE ar.id_user = ? AND ar.id_article = ?
        GROUP BY ar.id
        LIMIT 1`,
        [idUser, idArticle]
    );
    return rows;
};

export const getOrders = async (status) => {
    const statusArray = status.split(",");
    const statusQuery = statusArray.map(() => "?").join(",");
    const [rows] = await connection.execute(
        `SELECT 
                cbt.*,
                CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
                pm.name AS pay_method_name,
                pm.require_image AS require_image,
                cu.name AS currency,
                cu.iso_code AS currency_iso_code,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_article', a.id,
                        'article_image', a.main_image,
                        'article_name', a.name,
                        'article_description', a.description,
                        'article_price_item', cbi.price_item, 
                        'article_price_options', cbi.price_options,
                        'article_total_price', cbi.total_price,
                        'total_price_with_discount', cbi.total_price_with_discount,
                        'article_percent_discount', cbi.percent_discount,
                        'article_quantity', c.quantity
                    )
                ) AS articles
            FROM carts_bought cbt
            LEFT JOIN carts_bought_items cbi ON (cbi.id_cart_bought = cbt.id)
            LEFT JOIN carts c ON (c.id = cbi.id_cart)
            LEFT JOIN articles a ON (c.id_article = a.id)
            LEFT JOIN users u ON (u.id = cbt.id_user)
            LEFT JOIN payment_methods pm ON (pm.id = cbt.id_pay_method)
            LEFT JOIN currencies cu ON (cu.id = cbt.id_currency)
            WHERE cbt.status IN (${statusQuery})
            GROUP BY cbt.id, pm.name, pm.require_image
            ORDER BY cbt.created_at DESC
        `,
        [...statusArray]
    );
    return rows;
};

export const getOrdersByresponsibleShop = async (idShop, status) => {
    const statusArray = status.split(",");
    const statusQuery = statusArray.map(() => "?").join(",");
    const [rows] = await connection.execute(
        `SELECT 
                cbt.*,
                CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
                pm.name AS pay_method_name,
                pm.require_image AS require_image,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_article', a.id,
                        'article_image', a.main_image,
                        'article_name', a.name,
                        'article_description', a.description,
                        'article_price_item', cbi.price_item, 
                        'article_price_options', cbi.price_options,
                        'article_total_price', cbi.total_price,
                        'total_price_with_discount', cbi.total_price_with_discount,
                        'article_percent_discount', cbi.percent_discount,
                        'article_quantity', c.quantity
                    )
                ) AS articles
            FROM carts_bought cbt
            LEFT JOIN carts_bought_items cbi ON (cbi.id_cart_bought = cbt.id)
            LEFT JOIN carts c ON (c.id = cbi.id_cart)
            LEFT JOIN articles a ON (c.id_article = a.id)
            LEFT JOIN users u ON (u.id = cbt.id_user)
            LEFT JOIN payment_methods pm ON (pm.id = cbt.id_pay_method)
            WHERE cbt.id_shop_for_address = ? AND cbt.status IN (${statusQuery})
            GROUP BY cbt.id, pm.name, pm.require_image
        `,
        [idShop, ...statusArray]
    );
    return rows;
};

export const getOrdersFromShop = async (idShop, status) => {
    const statusArray = status.split(",");
    const statusQuery = statusArray.map(() => "?").join(",");
    const [rows] = await connection.execute(
        `SELECT 
                cbt.*,
                CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
                pm.name AS pay_method_name,
                pm.require_image AS require_image,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_article', a.id,
                        'article_image', a.main_image,
                        'article_name', a.name,
                        'article_description', a.description,
                        'article_price_item', cbi.price_item, 
                        'article_price_options', cbi.price_options,
                        'article_total_price', cbi.total_price,
                        'total_price_with_discount', cbi.total_price_with_discount,
                        'article_percent_discount', cbi.percent_discount,
                        'article_quantity', c.quantity
                    )
                ) AS articles
            FROM carts_bought cbt
            LEFT JOIN carts_bought_items cbi ON (cbi.id_cart_bought = cbt.id)
            LEFT JOIN carts c ON (c.id = cbi.id_cart)
            INNER JOIN articles a ON (c.id_article = a.id AND a.id_shop = ?)
            LEFT JOIN users u ON (u.id = cbt.id_user)
            LEFT JOIN payment_methods pm ON (pm.id = cbt.id_pay_method)
            WHERE cbt.status IN (${statusQuery})
            GROUP BY cbt.id, pm.name, pm.require_image
            ORDER BY cbt.created_at DESC
        `,
        [idShop, ...statusArray]
    );
    return rows;
};

export const getOrdersFromShopAndOrder = async (idShop, idOrder) => {
    const [rows] = await connection.execute(
        `SELECT 
                cbt.*,
                CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_cart_bought_item', cbi.id,
                        'id_article', a.id,
                        'article_image', a.main_image,
                        'article_name', a.name,
                        'article_description', a.description,
                        'article_price_item', cbi.price_item, 
                        'article_price_options', cbi.price_options,
                        'article_total_price', cbi.total_price,
                        'total_price_with_discount', cbi.total_price_with_discount,
                        'article_percent_discount', cbi.percent_discount,
                        'article_quantity', c.quantity,
                        'status_cart_bought_item', cbi.status
                    )
                ) AS articles
            FROM carts_bought cbt
            LEFT JOIN carts_bought_items cbi ON (cbi.id_cart_bought = cbt.id)
            LEFT JOIN carts c ON (c.id = cbi.id_cart)
            INNER JOIN articles a ON (c.id_article = a.id AND a.id_shop = ?)
            LEFT JOIN users u ON (u.id = cbt.id_user)
            WHERE cbt.id = ?
            GROUP BY cbt.id
            LIMIT 1
        `,
        [idShop, idOrder]
    );
    return rows;
};

export const updateCartBoughtItemStatus = async (id, status) => {
    const [result] = await connection.execute(`UPDATE carts_bought_items SET status = ? WHERE id = ?`, [status, id]);
    return result.affectedRows;
};

// const sumar = () =>

export const getOrderById = async (idOrder) => {
    const [rows] = await connection.execute(
        `SELECT 
                cbt.*,
                CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
                pm.name AS pay_method_name,
                pm.require_image AS require_image,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id_article', a.id,
                        'article_image', a.main_image,
                        'article_name', a.name,
                        'article_description', a.description,
                        'article_price_item', cbi.price_item, 
                        'article_price_options', cbi.price_options,
                        'article_total_price', cbi.total_price,
                        'total_price_with_discount', cbi.total_price_with_discount,
                        'article_percent_discount', cbi.percent_discount,
                        'article_quantity', c.quantity,
                        'id_cart_bought_item', cbi.id,
                        'status_cart_bought_item', cbi.status,
                        'article_id_shop', a.id_shop,
                        'article_name_shop', s.name,
                        'cart_id', c.id
                    )
                ) AS articles
            FROM carts_bought cbt
            LEFT JOIN carts_bought_items cbi ON (cbi.id_cart_bought = cbt.id)
            LEFT JOIN carts c ON (c.id = cbi.id_cart)
            INNER JOIN articles a ON (c.id_article = a.id)
            LEFT JOIN shops s ON (s.id = a.id_shop)
            LEFT JOIN users u ON (u.id = cbt.id_user)
            LEFT JOIN payment_methods pm ON (pm.id = cbt.id_pay_method)
            WHERE cbt.id = ?
            GROUP BY cbt.id, pm.name, pm.require_image
            LIMIT 1
        `,
        [idOrder]
    );
    return rows;
};

export const updateCartBoughtStatusImage = async (id, statusImage) => {
    const [result] = await connection.execute(`UPDATE carts_bought SET status_image = ? WHERE id = ?`, [statusImage, id]);
    return result.affectedRows > 0;
};

export const updateCartBoughtStatus = async (id, status) => {
    const [result] = await connection.execute(`UPDATE carts_bought SET status = ? WHERE id = ?`, [status, id]);
    return result.affectedRows > 0;
};

export const getOrderByIdCart = async (idCart) => {
    const [rows] = await connection.execute(
        `SELECT 
                cb.created_at AS created_at_order,
                cb.id AS id_order,
                cb.status AS status_order,
                cb.want_use_address,
                -- pm.name AS pay_method_name,
                CONCAT_WS(' ', u.first_name, u.last_name) AS user_name,
                cb.id_address_user,
                cb.id_shop_for_address,
                ua.country,
                ua.full_name,
                ua.number,
                ua.address_1,
                ua.address_2,
                ua.neighborhood,
                ua.province,
                cb.id_pay_method,
                s.name AS pickup_shop, 
                pm.name AS name_pay_method,
                cb.id_currency,
                cb.total,
                cb.total_discount,
                cb.paypal_fee,
                cb.paypal_payment_id,
                cb.delivery_cost,
                cb.delivery_distance,
                cu.exchange_rate,
                cu.main_currency,
                cu.symbol,
                cu.iso_code,
                cbi.total_price,
                pm.require_image,
                pm.is_paypal_method,
                cb.paypal_payment_id,
                cb.status_image,
                cb.image,
                CONCAT_WS(' - ', p.name, m.name, n.name) AS address,
                p.name AS province,
                m.name AS municipalitie,
                n.name AS neighborhood,
                ua.street
                -- SUM(cbi.price) AS total_price  
            FROM carts c
            LEFT JOIN carts_bought_items cbi ON (cbi.id_cart = c.id)
            LEFT JOIN carts_bought cb ON (cb.id = cbi.id_cart_bought)
            LEFT JOIN payment_methods pm ON (pm.id = cb.id_pay_method)
            LEFT JOIN users u ON (u.id = cb.id_user)
            LEFT JOIN users_addresses ua ON (ua.id = cb.id_address_user)
            LEFT JOIN shops s ON (s.id = cb.id_shop_for_address)
            LEFT JOIN currencies cu ON (cu.id = cb.id_currency)
            LEFT JOIN countries AS ca ON(ca.id = ua.country_id)
            LEFT JOIN provinces AS p ON(p.id = ua.province_id)
            LEFT JOIN municipalities AS m ON(m.id = ua.municipality_id)
            LEFT JOIN neighborhoods AS n ON(n.id = ua.neighborhood_id)

            WHERE c.id = ?
            -- GROUP BY cb.id, pm.name, cbi.id
            LIMIT 1
        `,
        [idCart]
    );
    return rows;
};

export const getArticlesOrdered = async (idUser, word) => {
    const [rows] = await connection.execute(
        `SELECT 
                a.*,
                c.id AS id_cart,
                c.created_at AS created_at_cart
            FROM carts c
            INNER JOIN articles a ON (a.id = c.id_article)
            WHERE c.id_user = ? AND (a.name LIKE ? OR a.description LIKE ?)
            GROUP BY c.id
        `,
        [idUser, `%${word}%`, `%${word}%`]
    );
    return rows;
};
