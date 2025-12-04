import connection from "../../connection.js";

export const getUsers = async () => {
    const [rows] = await connection.execute("SELECT * FROM users");
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            u.*,
            ut.name AS user_type_name
        FROM users AS u
        LEFT JOIN user_types AS ut ON (ut.id = u.user_type_id) 
        WHERE u.id = ?`,
        [id]
    );
    return rows[0];
};

export const createUser = async (id, first_names, last_names, registration_date, type, can_buy, email, password, direction) => {
    const [result] = await connection.execute(
        `INSERT INTO users(id, first_names, last_names, registration_date, type, can_buy, email, password, direction)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, first_names, last_names, registration_date, type, can_buy, email, password, direction]
    );
    return result.affectedRows;
};

export const createUserFromGoogle = async (id, first_name, last_name, type, can_buy, email, google_id, picture, email_verified) => {
    const [result] = await connection.execute(
        `INSERT INTO users(id, first_name, last_name, type, can_buy, email, google_id, picture, email_verified)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, first_name, last_name, type, can_buy, email, google_id, picture, email_verified]
    );
    return result.affectedRows;
};

export const updateUser = async (first_names, last_names, type, can_buy, email, password, direction, id) => {
    const [result] = await connection.execute(
        `UPDATE users SET first_names = ?, last_names = ?, type = ?, can_buy = ?, email = ?, password = ?, direction = ? WHERE id = ?`,
        [first_names, last_names, type, can_buy, email, password, direction, id]
    );
    return result.affectedRows > 0;
};

export const updateUserGoogleId = async (userId, googleId, picture) => {
    const [result] = await connection.execute(`UPDATE users SET google_id = ?, picture = ? WHERE id = ?`, [googleId, picture, userId]);
    return result.affectedRows > 0;
};

export const changeUserType = async (id, type) => {
    const [result] = await connection.execute(`UPDATE users SET type = ? WHERE id = ?`, [type, id]);
    return result.affectedRows > 0;
};
export const changeUserCanBuy = async (id, canBuy) => {
    const [result] = await connection.execute(`UPDATE users SET can_buy = ? WHERE id = ?`, [canBuy, id]);
    return result.affectedRows > 0;
};

export const setUserShop = async (id, shopId) => {
    const [result] = await connection.execute(`UPDATE users SET shop_id = ? WHERE id = ?`, [shopId, id]);
    return result.affectedRows > 0;
};

// export const createUserAddress = async (
//     id,
//     id_user,
//     country,
//     full_name,
//     number,
//     address_1,
//     address_2,
//     neighborhood,
//     province,
//     postal_code,
//     preferred_address,
//     status,
//     address_details,
//     country_id,
//     house_number,
//     latitude,
//     longitude,
//     municipality_id,
//     neighborhood_id,
//     phone_number,
//     province_id,
//     street
// ) => {
//     const [result] = await connection.execute(
//         `INSERT INTO users_addresses(id, id_user, country, full_name, number, address_1, address_2, neighborhood, province, postal_code, preferred_address, status, address_details,
//             country_id,
//             house_number,
//             latitude,
//             longitude,
//             municipality_id,
//             neighborhood_id,
//             phone_number,
//             province_id,
//             street,)
//         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`,
//         [
//             id,
//             id_user,
//             country,
//             full_name,
//             number,
//             address_1,
//             address_2,
//             neighborhood,
//             province,
//             postal_code,
//             preferred_address,
//             status,
//             address_details,
//             country_id,
//             house_number,
//             latitude,
//             longitude,
//             municipality_id,
//             neighborhood_id,
//             phone_number,
//             province_id,
//             street,
//         ]
//     );
//     return result.affectedRows > 0;
// };

export const createUserAddress = async (
    id,
    id_user,
    country,
    full_name,
    number,
    address_1,
    address_2,
    neighborhood,
    province,
    postal_code,
    preferred_address,
    status,
    address_details,
    country_id,
    house_number,
    latitude,
    longitude,
    municipality_id,
    neighborhood_id,
    phone_number,
    province_id,
    street
) => {
    const [result] = await connection.execute(
        `INSERT INTO users_addresses(
            id, id_user, country, full_name, number, address_1, address_2, neighborhood, province, postal_code, 
            preferred_address, status, address_details, country_id, house_number, latitude, longitude, municipality_id, 
            neighborhood_id, phone_number, province_id, street
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            id_user,
            country,
            full_name,
            number,
            address_1,
            address_2,
            neighborhood,
            province,
            postal_code,
            preferred_address,
            status,
            address_details,
            country_id,
            house_number,
            latitude,
            longitude,
            municipality_id,
            neighborhood_id,
            phone_number,
            province_id,
            street,
        ]
    );
    return result.affectedRows > 0;
};

// export const updateUserAddress = async (
//     id,
//     country,
//     full_name,
//     number,
//     address_1,
//     address_2,
//     neighborhood,
//     province,
//     postal_code,
//     preferred_address,
//     status
// ) => {
//     const [result] = await connection.execute(
//         `UPDATE users_addresses SET country = ?, full_name = ?, number = ?, address_1 = ?, address_2 = ?, neighborhood = ?, province = ?, postal_code = ?, preferred_address = ?, status = ? WHERE id = ?`,
//         [country, full_name, number, address_1, address_2, neighborhood, province, postal_code, preferred_address, status, id]
//     );
//     return result.affectedRows > 0;
// };

export const updateUserWantUseAddress = async (id, want_use_address) => {
    const [rows] = await connection.execute(`UPDATE users SET want_use_address = ? WHERE id = ?`, [want_use_address, id]);
    return rows.affectedRows > 0;
};

export const updateUserEmailVerified = async (email, email_verified) => {
    const [rows] = await connection.execute(`UPDATE users SET email_verified = ? WHERE email = ?`, [email_verified, email]);
    return rows.affectedRows > 0;
};

export const shopHasAdmin = async (id_shop) => {
    const [rows] = await connection.execute(
        `SELECT 
                COUNT(id) AS admins 
            FROM admin_shop 
            WHERE id_shop = ? AND status = 1 AND type = 1
            LIMIT 1
        `,
        [id_shop]
    );
    return rows[0].admins > 0;
};

export const createUserShopAdmin = async (id, id_user, email_user, id_shop, type, status) => {
    const [result] = await connection.execute(
        `INSERT INTO admin_shop(id, id_user, email_user, id_shop, type, status)
        VALUES(?, ?, ?, ?, ?, ?)`,
        [id, id_user, email_user, id_shop, type, status]
    );
    return result.affectedRows > 0;
};

export const getUserShop = async (emailUser) => {
    const [rows] = await connection.execute(
        `SELECT 
            adm.*,
            s.name AS name_shop
        FROM admin_shop adm
        LEFT JOIN shops s ON (s.id = adm.id_shop) 
        WHERE adm.email_user = ? 
        LIMIT 1
    `,
        [emailUser]
    );
    return rows;
};

export const updateUserIdShopForCart = async (idUser, idShop) => {
    const [rows] = await connection.execute(`UPDATE users SET id_shop_for_cart = ? WHERE id = ?`, [idShop, idUser]);
    return rows.affectedRows > 0;
};

export const updateUserIdPayMathodForCart = async (idUser, idPayMethod) => {
    const [rows] = await connection.execute(`UPDATE users SET id_payment_method_for_cart = ? WHERE id = ?`, [idPayMethod, idUser]);
    return rows.affectedRows > 0;
};

export const updateUserIdAddressForCart = async (idUser, idAddress) => {
    const [rows] = await connection.execute(`UPDATE users SET id_address_for_cart = ? WHERE id = ?`, [idAddress, idUser]);
    return rows.affectedRows > 0;
};

export const updateUserIdCurrency = async (idUser, idCurrency) => {
    const [rows] = await connection.execute(`UPDATE users SET id_currency = ? WHERE id = ?`, [idCurrency, idUser]);
    return rows.affectedRows > 0;
};

export const updateUserTypeId = async (idUser, userTypeId) => {
    const [rows] = await connection.execute(`UPDATE users SET user_type_id = ? WHERE id = ?`, [userTypeId, idUser]);
    return rows.affectedRows > 0;
};
