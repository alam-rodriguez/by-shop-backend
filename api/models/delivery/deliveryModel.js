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

export const getDeliveriesOrders = async () => {
    const [rows] = await connection.execute(
        `
      SELECT 
        do.id,
        do.price,
        CONCAT_WS(' ', u.first_name, u.last_name) AS nombre_cliente,
        COUNT(cbi.id) AS count_articles
      FROM deliveries_orders AS do
      LEFT JOIN carts_bought AS cb ON (cb.id = do.id_cart_bouth) 
      LEFT JOIN carts_bought_items AS cbi ON (cbi.id_cart_bought = cb.id)
      LEFT JOIN users AS u ON (u.id = cb.id_user)
      WHERE do.status = 1
      GROUP BY do.id
    `,
        []
    );
    return rows;
};
