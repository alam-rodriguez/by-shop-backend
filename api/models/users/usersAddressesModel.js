// Connection
import connection from "../../connection.js";

export const getUserAddresses = async (id_user) => {
    const [rows] = await connection.execute("SELECT * FROM users_addresses WHERE id_user = ?", [id_user]);
    return rows;
};

export const getAddressById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM users_addresses WHERE id = ? LIMIT 1", [id]);
    return rows;
};

export const updateUserAddress = async (
    id,
    country,
    full_name,
    number,
    address_1,
    address_2,
    neighborhood,
    province,
    postal_code,
    preferred_address,
    status
) => {
    const [result] = await connection.execute(
        `UPDATE users_addresses SET country = ?, full_name = ?, number = ?, address_1 = ?, address_2 = ?, neighborhood = ?, province = ?, postal_code = ?, preferred_address = ?, status = ? WHERE id = ?`,
        [country, full_name, number, address_1, address_2, neighborhood, province, postal_code, preferred_address, status, id]
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