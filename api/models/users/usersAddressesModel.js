// Connection
import connection from "../../connection.js";

export const getUserAddresses = async (id_user) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            ua.*,
            CONCAT_WS(' - ', p.name, m.name, n.name) AS location
        FROM users_addresses ua
        LEFT JOIN provinces AS p ON(p.id = ua.province_id)
        LEFT JOIN municipalities AS m ON(m.id = ua.municipality_id)
        LEFT JOIN neighborhoods AS n ON(n.id = ua.neighborhood_id) 
        WHERE ua.id_user = ?
        `,
        [id_user]
    );
    return rows;
};

export const getAddressById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM users_addresses WHERE id = ? LIMIT 1", [id]);
    return rows;
};

export const updateUserAddress = async (
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
        `UPDATE users_addresses SET
            id_user = ?,
            country = ?,
            full_name = ?,
            number = ?,
            address_1 = ?,
            address_2 = ?,
            neighborhood = ?,
            province = ?,
            postal_code = ?,
            preferred_address = ?,
            status = ?,
            address_details = ?,
            country_id = ?,
            house_number = ?,
            latitude = ?,
            longitude = ?,
            municipality_id = ?,
            neighborhood_id = ?,
            phone_number = ?,
            province_id = ?,
            street = ?
        WHERE id = ?`,
        [
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
            id,
        ]
    );
    return result.affectedRows > 0;
};

export const addressUserPreferred = async (id_user) => {
    const [rows] = await connection.execute("SELECT * FROM users_addresses WHERE id_user = ? AND preferred_address = 1 LIMIT 1", [id_user]);
    return rows;
};

export const setUserAddressesNotPreferred = async (idUser) => {
    const [rows] = await connection.execute("UPDATE users_addresses SET preferred_address = 0 WHERE id_user = ?", [idUser]);
    return rows.affectedRows > 0;
};

export const setUserAddressPreferred = async (idAddress) => {
    const [rows] = await connection.execute("UPDATE users_addresses SET preferred_address = 1 WHERE id = ?", [idAddress]);
    return rows.affectedRows > 0;
};
