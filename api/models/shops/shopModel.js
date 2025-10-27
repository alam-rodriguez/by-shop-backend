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

export const createShop = async (id, name, description, logo, type, status) => {
    const [result] = await connection.execute(
        `INSERT INTO shops(id, name, description, logo, type, status) 
            VALUES( ?, ?, ?, ?, ?, ?)`,
        [id, name, description, logo, type, status]
    );
    return result.affectedRows;
};

export const updateShop = async (id, name, logo, type, status) => {
    const [result] = await connection.execute(`UPDATE shops SET name = ?, logo = ?, type = ?, status = ? WHERE id = ?`, [
        name,
        logo,
        type,
        status,
        id,
    ]);
    return result.affectedRows;
};

export const updateStatusShop = async (id, status) => {
    const [result] = await connection.execute(`UPDATE shops SET status = ? WHERE id = ?`, [status, id]);
    return result.affectedRows;
};

export const getShopsForCart = async (idUser) => {
    const [rows] = await connection.execute(
        `
        SELECT 
            s.*
        FROM carts AS c
        LEFT JOIN articles AS a ON c.id_article = a.id
        LEFT JOIN shops AS s ON a.id_shop = s.id
        WHERE c.id_user = ? AND c.status = 1
        GROUP BY s.id;`,
        [idUser]
    );
    return rows;
};
