import connection from "../../connection.js";

export const createPeriod = async (id, start_date, end_date, status) => {
    const [rows] = await connection.execute(`INSERT INTO periods(id, start_date, end_date, status) VALUES(?, ?, ?, ?)`, [
        id,
        start_date,
        end_date,
        status,
    ]);
    return rows.affectedRows > 0;
};

export const getPeriodActive = async () => {
    const [rows] = await connection.execute(`
            SELECT 
                p.*,
                COUNT(DISTINCT cb.id) AS orders_count,
                -- SUM(cbi.total_quantity) AS articles_total_quantity,
                COALESCE(SUM(cbi.total_quantity), 0) AS articles_total_quantity,
                SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
                SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
                SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
                SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
                -- SUM(cb.total * cb.exchange_rate) AS total_amount,
                -- SUM(cb.total_discount * cb.exchange_rate) AS discount_amount,
                -- SUM(cb.delivery_cost * cb.exchange_rate) AS delivery_amount,
                -- SUM(cb.paypal_fee * cb.exchange_rate) AS paypal_fee_amount,
                main_cur.iso_code AS main_currency,
                main_cur.id AS currency_id
            FROM periods AS p
            LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            LEFT JOIN (
                SELECT id_cart_bought, SUM(quantity) AS total_quantity
                FROM carts_bought_items
                GROUP BY id_cart_bought
            ) cbi ON cbi.id_cart_bought = cb.id
            -- LEFT JOIN carts_bought_items AS cbi ON(cbi.id_cart_bought = cb.id)
            LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            WHERE NOW() BETWEEN p.start_date AND p.end_date 
            GROUP BY p.id, main_cur.id
            ORDER BY p.created_at DESC 
            LIMIT 1;
        `);
    return rows;
};

export const getPeriodActiveForShop = async (shopId) => {
    const [rows] = await connection.execute(
        `
            SELECT 
                p.*,
                COUNT(DISTINCT cb.id) AS orders_count,
                -- SUM(cbi.total_quantity) AS articles_total_quantity,
                COALESCE(SUM(cbi.total_quantity), 0) AS articles_total_quantity,
                SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
                SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
                SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
                SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
                main_cur.iso_code AS main_currency,
                py.id AS payout_id
            FROM periods AS p
            LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            LEFT JOIN (
                SELECT id_cart_bought, id_cart, SUM(quantity) AS total_quantity
                FROM carts_bought_items
                GROUP BY id_cart_bought, id_cart
            ) cbi ON cbi.id_cart_bought = cb.id 
            LEFT JOIN carts AS c ON(c.id = cbi.id_cart)
            LEFT JOIN articles AS a ON(a.id = c.id_article AND a.id_shop = ?)
            LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            LEFT JOIN payouts AS py ON (py.period_id = p.id)
            WHERE NOW() BETWEEN p.start_date AND p.end_date
            GROUP BY  p.id,
                p.start_date,
                p.end_date,
                p.status,
                p.created_at,
                main_cur.id,
                py.id
            ORDER BY p.created_at DESC 
            LIMIT 1;
        `,
        [shopId]
    );
    return rows;
};

export const getShopsPeriodActive = async () => {
    const [rows] = await connection.execute(`
            SELECT 
                s.id
            FROM periods AS p
            LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            
             LEFT JOIN (
                SELECT id_cart_bought, id_cart, SUM(quantity) AS total_quantity
                FROM carts_bought_items
                GROUP BY id_cart_bought, id_cart
            ) cbi ON cbi.id_cart_bought = cb.id
            LEFT JOIN carts AS c ON(c.id = cbi.id_cart)
            LEFT JOIN articles AS a ON(a.id = c.id_article)
            INNER JOIN shops AS s ON(s.id = a.id_shop) 
            
            -- LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            -- LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            WHERE NOW() BETWEEN p.start_date AND p.end_date 
            GROUP BY p.id, s.id
            ORDER BY p.created_at DESC 
            LIMIT 1;
        `);
    return rows;
};

export const getPeriodActiveForAllShop = async () => {
    const [rows] = await connection.execute(
        `
            SELECT 
                s.id AS shop_id,
                s.name AS shop_name,
                p.*,
                COUNT(DISTINCT cb.id) AS orders_count,
                COALESCE(SUM(cbi.total_quantity), 0) AS articles_total_quantity,
                SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
                SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
                SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
                SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
                main_cur.iso_code AS main_currency,
                py.id AS payout_id
            FROM periods AS p
            LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            LEFT JOIN (
                SELECT id_cart_bought, id_cart, SUM(quantity) AS total_quantity
                FROM carts_bought_items
                GROUP BY id_cart_bought, id_cart
            ) cbi ON cbi.id_cart_bought = cb.id 
            LEFT JOIN carts AS c ON(c.id = cbi.id_cart)
            LEFT JOIN articles AS a ON(a.id = c.id_article)
            LEFT JOIN shops AS s ON(s.id = a.id_shop)
            LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            LEFT JOIN payouts AS py ON (py.period_id = p.id)
            WHERE NOW() BETWEEN p.start_date AND p.end_date
            GROUP BY  p.id,
                p.start_date,
                p.end_date,
                p.status,
                p.created_at,
                main_cur.id,
                s.id,
                py.id
            ORDER BY p.created_at DESC 
            LIMIT 1;
        `,
        []
    );
    return rows;
};

// CREATE TABLE payouts (
//                 id CHAR(36) NOT NULL PRIMARY KEY,
//                 period_id CHAR(36) NOT NULL,
//                 shop_id CHAR(36) NOT NULL, -- la tienda a la que se le paga
//                 amount DECIMAL(10,2) NOT NULL,          -- total a pagar a esa tienda
//                 commission DECIMAL(10,2) DEFAULT 0,     -- si quieres guardar la comisión calculada
//                 net_amount DECIMAL(10,2) NOT NULL,      -- amount - commission
//                 paid_at DATETIME DEFAULT CURRENT_TIMESTAMP -- fecha real de pago
//             );

export const createPeriodShopPayout = async (id, period_id, shop_id, amount, commission, net_amount, currency_id) => {
    const [rows] = await connection.execute(
        `INSERT INTO payouts(id, period_id, shop_id, amount, commission, net_amount, currency_id) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [id, period_id, shop_id, amount, commission, net_amount, currency_id]
    );
    return rows.affectedRows > 0;
};
export const shopPeriodPayout = async (period_id, shop_id) => {
    const [rows] = await connection.execute(`SELECT * FROM payouts WHERE period_id = ? AND shop_id = ? LIMIT 1;`, [period_id, shop_id]);
    return rows;
};

export const getPeriods = async () => {
    const [rows] = await connection.execute(`
            SELECT 
                p.*,
                COUNT(DISTINCT cb.id) AS orders_count,
                -- SUM(cbi.total_quantity) AS articles_total_quantity,
                COALESCE(SUM(cbi.total_quantity), 0) AS articles_total_quantity,
                SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
                SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
                SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
                SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
                -- SUM(cb.total * cb.exchange_rate) AS total_amount,
                -- SUM(cb.total_discount * cb.exchange_rate) AS discount_amount,
                -- SUM(cb.delivery_cost * cb.exchange_rate) AS delivery_amount,
                -- SUM(cb.paypal_fee * cb.exchange_rate) AS paypal_fee_amount,
                main_cur.iso_code AS main_currency,
                main_cur.id AS currency_id
            FROM periods AS p
            LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            LEFT JOIN (
                SELECT id_cart_bought, SUM(quantity) AS total_quantity
                FROM carts_bought_items
                GROUP BY id_cart_bought
            ) cbi ON cbi.id_cart_bought = cb.id
            -- LEFT JOIN carts_bought_items AS cbi ON(cbi.id_cart_bought = cb.id)
            LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            WHERE cb.created_at BETWEEN p.start_date AND p.end_date AND NOT NOW() BETWEEN p.start_date AND p.end_date
            GROUP BY p.id, main_cur.id
            ORDER BY p.created_at DESC;
        `);
    return rows;
};

export const getPeriodsForShop = async (shopId) => {
    const [rows] = await connection.execute(
        `
            -- SELECT 
            --     p.*,
            --     COUNT(DISTINCT cb.id) AS orders_count,
            --     -- SUM(cbi.total_quantity) AS articles_total_quantity,
            --     COALESCE(SUM(cbi.total_quantity), 0) AS articles_total_quantity,
            --     SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
            --     SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
            --     SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
            --     SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
            --     -- SUM(cb.total * cb.exchange_rate) AS total_amount,
            --     -- SUM(cb.total_discount * cb.exchange_rate) AS discount_amount,
            --     -- SUM(cb.delivery_cost * cb.exchange_rate) AS delivery_amount,
            --     -- SUM(cb.paypal_fee * cb.exchange_rate) AS paypal_fee_amount,
            --     main_cur.iso_code AS main_currency,
            --     main_cur.id AS currency_id
            -- FROM periods AS p
            -- LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            -- LEFT JOIN (
            --     SELECT id_cart_bought, SUM(quantity) AS total_quantity
            --     FROM carts_bought_items
            --     GROUP BY id_cart_bought
            -- ) cbi ON cbi.id_cart_bought = cb.id
            -- -- LEFT JOIN carts_bought_items AS cbi ON(cbi.id_cart_bought = cb.id)
            -- LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            -- LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            -- WHERE cb.created_at BETWEEN p.start_date AND p.end_date AND NOT NOW() BETWEEN p.start_date AND p.end_date
            -- GROUP BY p.id, main_cur.id
            -- ORDER BY p.created_at DESC;

            SELECT 
                p.*,
                COUNT(DISTINCT cb.id) AS orders_count,
                -- SUM(cbi.total_quantity) AS articles_total_quantity,
                COALESCE(SUM(cbi.total_quantity), 0) AS articles_total_quantity,
                SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
                SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
                SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
                SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
                main_cur.iso_code AS main_currency,
                py.id AS payout_id
            FROM periods AS p
            LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            LEFT JOIN (
                SELECT id_cart_bought, id_cart, SUM(quantity) AS total_quantity
                FROM carts_bought_items
                GROUP BY id_cart_bought, id_cart
            ) cbi ON cbi.id_cart_bought = cb.id 
            LEFT JOIN carts AS c ON(c.id = cbi.id_cart)
            LEFT JOIN articles AS a ON(a.id = c.id_article AND a.id_shop = ?)
            LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            LEFT JOIN payouts AS py ON (py.period_id = p.id)
            -- WHERE NOW() BETWEEN p.start_date AND p.end_date
            -- WHERE cb.created_at BETWEEN p.start_date AND p.end_date AND NOT NOW() BETWEEN p.start_date AND p.end_date
            -- WHERE NOT (NOW() BETWEEN p.start_date AND p.end_date)
             WHERE a.id_shop = ?
                 AND NOT (NOW() BETWEEN p.start_date AND p.end_date)
            -- WHERE cb.created_at BETWEEN p.start_date AND p.end_date
            GROUP BY  p.id,
                p.start_date,
                p.end_date,
                p.status,
                p.created_at,
                main_cur.id,
                py.id
            ORDER BY p.created_at DESC;
        `,
        [shopId, shopId]
    );
    return rows;
};
