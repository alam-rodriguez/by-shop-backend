import connection from "../../connection.js";

export const createDeliveryOrder = async (id, id_delivery, id_cart_bouth, price, status) => {
    const [rows] = await connection.execute(`INSERT INTO deliveries_orders(id, id_delivery, id_cart_bouth, price, status) VALUES(?, ?, ?, ?, ?)`, [
        id,
        id_delivery,
        id_cart_bouth,
        price,
        status,
    ]);
    return rows.affectedRows;
};

export const updateDeliveryOrderDeliveryId = async (idDelivery, status, deliveryOrderId) => {
    const [rows] = await connection.execute(`UPDATE deliveries_orders SET id_delivery = ?, status = ? WHERE id = ?`, [
        idDelivery,
        status,
        deliveryOrderId,
    ]);
    return rows.affectedRows > 0;
};

export const updateDeliveryOrderStatus = async (deliveryOrderId, status) => {
    const [rows] = await connection.execute(`UPDATE deliveries_orders SET status = ? WHERE id = ?`, [status, deliveryOrderId]);
    return rows.affectedRows > 0;
};

export const getDeliveriesOrders = async () => {
    const [rows] = await connection.execute(
        `
      SELECT 
        do.id,
        do.price,
        cb.delivery_cost,
        cb.delivery_distance,
        do.created_at,
        do.status,
        CONCAT_WS(' ', u.first_name, u.last_name) AS nombre_cliente,
        COUNT(DISTINCT cbi.id) AS count_articles,
        s.name AS shop_name,
        CASE 
            WHEN pm.require_image = 1 OR pm.bank_name IS NOT NULL OR pm.bank_account IS NOT NULL OR pm.is_paypal_method = 1 THEN 0
            ELSE 1
        END AS must_pay,
        (cb.total + cb.paypal_fee + cb.delivery_cost - cb.total_discount) AS total_price,
        dop.status AS delivery_order_preference_status,
        JSON_OBJECT(
          'iso_code', c.iso_code,
          'exchange_rate', c.exchange_rate,
          'name', c.name,
          'main_currency', c.main_currency
        ) AS 'currency'
      FROM deliveries_orders AS do
      LEFT JOIN carts_bought AS cb ON (cb.id = do.id_cart_bouth) 
      LEFT JOIN carts_bought_items AS cbi ON (cbi.id_cart_bought = cb.id)
      LEFT JOIN users AS u ON (u.id = cb.id_user)
      LEFT JOIN shops AS s ON(s.id = cb.id_shop_for_address)
      LEFT JOIN payment_methods AS pm ON(pm.id = cb.id_pay_method)
      LEFT JOIN currencies AS c ON(c.id = cb.id_currency)
      -- LEFT JOIN delivery_order_preferences AS dop ON(dop.delivery_order_id = do.id)
      LEFT JOIN (
        SELECT delivery_order_id, MAX(status) AS status
        FROM delivery_order_preferences
        GROUP BY delivery_order_id
      ) AS dop ON dop.delivery_order_id = do.id
      WHERE do.status = 1
      GROUP BY do.id, pm.require_image, pm.bank_name, pm.bank_account, pm.is_paypal_method, dop.status
    `,
        []
    );
    return rows;
};

export const getDeliveriesOrdersHistoryDeliveryUserId = async (deliveryUserId) => {
    const [rows] = await connection.execute(
        `
      SELECT 
        do.id,
        do.price,
        cb.delivery_cost,
        cb.delivery_distance,
        do.created_at,
        CONCAT_WS(' ', u.first_name, u.last_name) AS nombre_cliente,
        COUNT(DISTINCT cbi.id) AS count_articles,
        s.name AS shop_name,
        CASE 
            WHEN pm.require_image = 1 OR pm.bank_name IS NOT NULL OR pm.bank_account IS NOT NULL OR pm.is_paypal_method = 1 THEN 0
            ELSE 1
        END AS must_pay,
        (cb.total + cb.paypal_fee + cb.delivery_cost - cb.total_discount) AS total_price,
        dop.status AS delivery_order_preference_status,
        JSON_OBJECT(
          'iso_code', c.iso_code,
          'exchange_rate', c.exchange_rate,
          'name', c.name,
          'main_currency', c.main_currency
        ) AS 'currency'
      FROM deliveries_orders AS do
      LEFT JOIN carts_bought AS cb ON (cb.id = do.id_cart_bouth) 
      LEFT JOIN carts_bought_items AS cbi ON (cbi.id_cart_bought = cb.id)
      LEFT JOIN users AS u ON (u.id = cb.id_user)
      LEFT JOIN shops AS s ON(s.id = cb.id_shop_for_address)
      LEFT JOIN payment_methods AS pm ON(pm.id = cb.id_pay_method)
      LEFT JOIN currencies AS c ON(c.id = cb.id_currency)
      -- LEFT JOIN delivery_order_preferences AS dop ON(dop.delivery_order_id = do.id)
      LEFT JOIN (
        SELECT delivery_order_id, MAX(status) AS status
        FROM delivery_order_preferences
        GROUP BY delivery_order_id
      ) AS dop ON dop.delivery_order_id = do.id
      WHERE do.id_delivery = ? AND do.status = 2 
      GROUP BY do.id, pm.require_image, pm.bank_name, pm.bank_account, pm.is_paypal_method, dop.status
    `,
        [deliveryUserId]
    );
    return rows;
};

export const getDeliveryOrderExists = async (idCartBouth) => {
    const [rows] = await connection.execute(
        `
      SELECT 
        id
      FROM deliveries_orders 
      WHERE id_cart_bouth = ?
    `,
        [idCartBouth]
    );
    return rows.length > 0;
};

export const createDeliveryOrderPreference = async (id, id_delivery, delivery_order_id, status) => {
    const [rows] = await connection.execute(`INSERT INTO delivery_order_preferences(id, id_delivery, delivery_order_id, status) VALUES(?, ?, ?, ?)`, [
        id,
        id_delivery,
        delivery_order_id,
        status,
    ]);
    return rows.affectedRows > 0;
};

export const getDeliveryOrderPreference = async (id_delivery, delivery_order_id) => {
    const [rows] = await connection.execute(
        `
      SELECT 
        id
      FROM delivery_order_preferences AS do
      WHERE id_delivery = ? AND delivery_order_id = ?
    `,
        [id_delivery, delivery_order_id]
    );
    return rows;
};

export const updateDeliveryOrderPreference = async (id, status) => {
    const [rows] = await connection.execute(`UPDATE delivery_order_preferences SET status = ? WHERE id = ?`, [status, id]);
    return rows.affectedRows > 0;
};

export const getDeliveryOrderById = async (id) => {
    const [rows] = await connection.execute(
        `
        -- SELECT 
        -- *
      -- FROM deliveries_orders
      -- WHERE id = ?

          SELECT 
            do.id,
            do.id_delivery,
            do.price,
            cb.id AS cart_bought_id,
            cb.delivery_cost,
            cb.delivery_distance,
            do.created_at,
            do.status,
            CONCAT_WS(' ', u.first_name, u.last_name) AS nombre_cliente,
            COUNT(DISTINCT cbi.id) AS count_articles,
            s.name AS shop_name,
            cb.id_shop_for_address AS shop_id,
            CASE 
                WHEN pm.require_image = 1 OR pm.bank_name IS NOT NULL OR pm.bank_account IS NOT NULL OR pm.is_paypal_method = 1 THEN 0
                ELSE 1
            END AS must_pay,
            (cb.total + cb.paypal_fee + cb.delivery_cost - cb.total_discount) AS total_price,
            dop.status AS delivery_order_preference_status,
            JSON_OBJECT(
              'iso_code', c.iso_code,
              'exchange_rate', c.exchange_rate,
              'name', c.name,
              'main_currency', c.main_currency
            ) AS 'currency',
            JSON_OBJECT(
              'latitude', ua.latitude,
              'longitude', ua.longitude
            ) AS 'user_address',
            cb.id_user
          FROM deliveries_orders AS do
          LEFT JOIN carts_bought AS cb ON (cb.id = do.id_cart_bouth) 
          LEFT JOIN carts_bought_items AS cbi ON (cbi.id_cart_bought = cb.id)
          LEFT JOIN users AS u ON (u.id = cb.id_user)
          LEFT JOIN shops AS s ON(s.id = cb.id_shop_for_address)
          LEFT JOIN payment_methods AS pm ON(pm.id = cb.id_pay_method)
          LEFT JOIN currencies AS c ON(c.id = cb.id_currency)
          -- LEFT JOIN delivery_order_preferences AS dop ON(dop.delivery_order_id = do.id)
          LEFT JOIN (
            SELECT delivery_order_id, MAX(status) AS status
            FROM delivery_order_preferences
            GROUP BY delivery_order_id
          ) AS dop ON dop.delivery_order_id = do.id
          LEFT JOIN users_addresses AS ua ON(ua.id = cb.id_address_user)
          WHERE do.id = ?
          GROUP BY do.id, pm.require_image, pm.bank_name, pm.bank_account, pm.is_paypal_method, dop.status
        `,
        [id]
    );
    return rows;
};
