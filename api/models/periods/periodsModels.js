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
                SUM(cbi.total_quantity) AS articles_total_quantity,
                SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
                SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
                SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
                SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
                -- SUM(cb.total * cb.exchange_rate) AS total_amount,
                -- SUM(cb.total_discount * cb.exchange_rate) AS discount_amount,
                -- SUM(cb.delivery_cost * cb.exchange_rate) AS delivery_amount,
                -- SUM(cb.paypal_fee * cb.exchange_rate) AS paypal_fee_amount,
                main_cur.iso_code AS main_currency
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
                SUM(cbi.total_quantity) AS articles_total_quantity,
                SUM(cb.total / cur.exchange_rate) AS total_amount,              -- total general del periodo
                SUM(cb.total_discount / cur.exchange_rate) AS discount_amount,
                SUM(cb.delivery_cost / cur.exchange_rate) AS delivery_amount,
                SUM(cb.paypal_fee / cur.exchange_rate) AS paypal_fee_amount,
                main_cur.iso_code AS main_currency
            FROM periods AS p
            LEFT JOIN carts_bought AS cb ON(cb.created_at BETWEEN p.start_date AND p.end_date)
            LEFT JOIN (
                SELECT id_cart_bought, SUM(quantity) AS total_quantity
                FROM carts_bought_items
                GROUP BY id_cart_bought
            ) cbi ON cbi.id_cart_bought = cb.id AND 
            LEFT JOIN carts AS c ON(c.id = cbi.id_cart)
            INNER JOIN articles AS a ON(a.id_shop = cbi.id_article)


            LEFT JOIN currencies AS cur ON(cur.id = cb.id_currency)
            LEFT JOIN currencies AS main_cur ON(main_cur.main_currency = 1)
            WHERE NOW() BETWEEN p.start_date AND p.end_date 
            GROUP BY p.id, main_cur.id
            ORDER BY p.created_at DESC 
            WHERE a.id_shop = ?
            LIMIT 1;
        `,
        [shopId]
    );
    return rows;
};
