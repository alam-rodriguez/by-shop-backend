import connection from "../../connection.js";

export const getShops = async () => {
    const [rows] = await connection.execute("SELECT * FROM shops");
    return rows;
};

export const getShopsById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM shops WHERE id = ? LIMIT 1", [id]);
    return rows;
};

// export const createShop = async (id, name, logo, create_date, type, status) => {
//     const [result] = await connection.execute(
//         `INSERT INTO shops(id, name, logo, create_date, type, status) VALUES(
//             ?,
//             ?,
//             ?,
//             ?,
//             ?,
//             ?
//         )`,
//         [id, name, logo, create_date, type, status]
//     );
//     return result.affectedRows;
// };

// CREATE TABLE shops(
//     id CHAR(36) NOT NULL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     description VARCHAR(255) NOT NULL,
//     logo VARCHAR(2083) NOT NULL,
//     type TINYINT NOT NULL,
//     status TINYINT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE shops(
//                 id CHAR(36) NOT NULL PRIMARY KEY,
//                 name VARCHAR(255) NOT NULL,
//                 description VARCHAR(255) NOT NULL,
//                 logo VARCHAR(2083) NOT NULL,
//                 type TINYINT NOT NULL,
//                 country_id char(36) NOT NULL,
//                 province_id char(36) NOT NULL,
//                 municipality_id char(36) NOT NULL,
//                 district_id char(36),
//                 neighborhood_id char(36) NOT NULL,
//                 street VARCHAR(255) NOT NULL,
//                 local_number VARCHAR(50),
//                 address_details VARCHAR(255),
//                 postal_code VARCHAR(6),
//                 phone_number VARCHAR(20) NOT NULL,
//                 latitude DECIMAL(10,8) NOT NULL,
//                 longitude DECIMAL(11,8) NOT NULL,
//                 status TINYINT NOT NULL,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );

export const createShop = async (
    id,
    name,
    description,
    logo,
    type,
    country_id,
    province_id,
    municipality_id,
    district_id,
    neighborhood_id,
    street,
    local_number,
    address_details,
    postal_code,
    phone_number,
    latitude,
    longitude,
    plan_id,
    status,
) => {
    const [result] = await connection.execute(
        `INSERT INTO shops(id,
    name,
    description,
    logo,
    type,
    country_id,
    province_id,
    municipality_id,
    district_id,
    neighborhood_id,
    street,
    local_number,
    address_details,
    postal_code,
    phone_number,
    latitude,
    longitude,
    plan_id,
    status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            name,
            description,
            logo,
            type,
            country_id,
            province_id,
            municipality_id,
            district_id,
            neighborhood_id,
            street,
            local_number,
            address_details,
            postal_code,
            phone_number,
            latitude,
            longitude,
            plan_id,
            status,
        ],
    );
    return result.affectedRows;
};

export const updateShop = async (
    id,
    name,
    description,
    logo,
    type,
    country_id,
    province_id,
    municipality_id,
    district_id,
    neighborhood_id,
    street,
    local_number,
    address_details,
    postal_code,
    phone_number,
    latitude,
    longitude,
    status,
) => {
    const [result] = await connection.execute(
        `UPDATE shops 
      SET 
        name = ?,
        description = ?,
        logo = ?,
        type = ?,
        country_id = ?,
        province_id = ?,
        municipality_id = ?,
        district_id = ?,
        neighborhood_id = ?,
        street = ?,
        local_number = ?,
        address_details = ?,
        postal_code = ?,
        phone_number = ?,
        latitude = ?,
        longitude = ?,
        status = ?
      WHERE id = ?`,
        [
            name,
            description,
            logo,
            type,
            country_id,
            province_id,
            municipality_id,
            district_id,
            neighborhood_id,
            street,
            local_number,
            address_details,
            postal_code,
            phone_number,
            latitude,
            longitude,
            status,
            id,
        ],
    );
    return result.affectedRows;
};

export const updateStatusShop = async (id, status) => {
    const [result] = await connection.execute(`UPDATE shops SET status = ? WHERE id = ?`, [status, id]);
    return result.affectedRows;
};

// TODO: TRAER TOTAL DE CADA TIENDA TAMBIEN
// export const getShopsForCart = async (idUser) => {
//     const [rows] = await connection.execute(
//         `
//         SELECT
//             s.*
//         FROM carts AS c
//         LEFT JOIN articles AS a ON c.id_article = a.id
//         LEFT JOIN shops AS s ON a.id_shop = s.id
//         WHERE c.id_user = ? AND c.status IN (1, 2) AND a.status = 1 AND a.quantity >= c.quantity
//         GROUP BY s.id;`,
//         [idUser],
//     );
//     return rows;
// };

export const getShopsForCart = async (idUser) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            s.*,
            SUM(a.price * c.quantity) AS shop_total_price
        FROM carts AS c
        LEFT JOIN articles AS a ON c.id_article = a.id
        LEFT JOIN shops AS s ON a.id_shop = s.id
        -- LEFT JOIN 
        WHERE c.id_user = ? AND c.status IN (1, 2) AND a.status = 1 AND a.quantity >= c.quantity
        GROUP BY s.id;`,
        [idUser],
    );
    return rows;
};

export const getShopsForCartBought = async (idCartBought) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            DISTINCT s.*
        FROM carts_bought AS cb
        JOIN carts_bought_items AS cbi ON(cbi.id_cart_bought = cb.id)
        JOIN carts AS c ON(c.id = cbi.id_cart)
        JOIN articles AS a ON(c.id_article = a.id)
        JOIN shops AS s ON(a.id_shop = s.id)
        WHERE cb.id = ?;`,
        [idCartBought],
    );
    return rows;
};
