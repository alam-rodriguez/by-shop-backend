import connection from "../../connection.js";

export const userDeviceHasPushNotificationSubscription = async (user_id, endpoint, p256dh, auth) => {
    const [result] = await connection.execute(
        `
        SELECT 
            id 
        FROM user_push_notifications_subscriptions 
        WHERE user_id = ? AND endpoint = ? AND p256dh = ? AND auth = ?`,
        [user_id, endpoint, p256dh, auth]
    );
    return result.length > 0;
};

export const createUserPushNotificationSubscription = async (id, user_id, endpoint, p256dh, auth, user_agent, status) => {
    const [result] = await connection.execute(
        `INSERT INTO user_push_notifications_subscriptions(id, user_id, endpoint, p256dh, auth, user_agent, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, user_id, endpoint, p256dh, auth, user_agent, status]
    );
    return result.affectedRows;
};

export const getUsersPushNotificationSubscriptions = async () => {
    const [result] = await connection.execute(`SELECT * FROM user_push_notifications_subscriptions WHERE status = 1`, []);
    return result;
};

export const getUsersSupportAndDevSubscriptions = async () => {
    const [result] = await connection.execute(
        `SELECT 
            us.endpoint AS 'endpoint',
            JSON_OBJECT(
                'p256dh', us.p256dh,
                'auth', us.auth
            ) AS 'keys'
        FROM user_push_notifications_subscriptions AS us
        INNER JOIN users AS u ON (u.id = us.user_id)
        INNER JOIN user_types AS ut ON(ut.id = u.user_type_id)
        WHERE us.status = 1 AND ut.name IN('SUPPORT', 'DEV')
        `
    );
    return result;
};

export const getUsersSubAdminAndAdminShopsSubscriptions = async (idCartBought) => {
    const [result] = await connection.execute(
        `SELECT 
            us.endpoint AS 'endpoint',
            JSON_OBJECT(
                'p256dh', us.p256dh,
                'auth', us.auth
            ) AS 'keys'
        FROM carts_bought AS cb
        LEFT JOIN carts_bought_items AS cbi ON(cbi.id_cart_bought = cb.id)
        LEFT JOIN carts AS c ON(c.id = cbi.id_cart)
        LEFT JOIN articles AS a ON(a.id = c.id_article)
        LEFT JOIN shops AS s ON(s.id = a.id_shop)
        LEFT JOIN admin_shop AS ash ON(ash.id_shop = s.id)
        LEFT JOIN users AS u ON (u.id = ash.id_user)
        LEFT JOIN user_push_notifications_subscriptions AS us ON(us.user_id = u.id)
        LEFT JOIN user_types AS ut ON(ut.id = u.user_type_id)
        WHERE cb.id = ? AND us.status = 1 AND ut.name IN('SUB-ADMIN-SHOP', 'ADMIN-SHOP')
        `,
        [idCartBought]
    );
    return result;
};

export const getClientSubscriptions = async (userId) => {
    const [result] = await connection.execute(
        `SELECT 
            us.endpoint AS 'endpoint',
            JSON_OBJECT(
                'p256dh', us.p256dh,
                'auth', us.auth
            ) AS 'keys'
        FROM user_push_notifications_subscriptions AS us
        WHERE us.user_id = ? AND us.status = 1
        `,
        [userId]
    );
    return result;
};

export const getUsersDeliveriesSubscriptions = async () => {
    const [result] = await connection.execute(
        `SELECT 
            us.endpoint AS 'endpoint',
            JSON_OBJECT(
                'p256dh', us.p256dh,
                'auth', us.auth
            ) AS 'keys'
        FROM user_push_notifications_subscriptions AS us
        INNER JOIN users AS u ON (u.id = us.user_id)
        INNER JOIN user_types AS ut ON(ut.id = u.user_type_id)
        WHERE us.status = 1 AND ut.name = 'DELIVERY'
        `
    );
    return result;
};
