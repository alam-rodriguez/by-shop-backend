// Connectios
import connection from "../../connection.js";

export const getHomeCategories = async () => {
    const [rows] = await connection.execute("SELECT * FROM home_categories ORDER BY sort_order");
    return rows;
};

export const getHomeCategoryById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM home_categories WHERE id = ?", [id]);
    return rows;
};

export const createHomeCategory = async (id, name, description, sort_order, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO home_categories(id, name, description, sort_order, status)
        VALUES(?, ?, ?, ?, ?);`,
        [id, name, description, sort_order, status]
    );
    return rows.affectedRows > 0;
};

export const updateHomeCategory = async (id, name, description, sort_order, status) => {
    const [rows] = await connection.execute(`UPDATE home_categories SET name = ?, description = ?, sort_order = ?, status = ? WHERE id = ?`, [
        name,
        description,
        sort_order,
        status,
        id,
    ]);
    return rows.affectedRows > 0;
};

// CREATE TABLE home_category_store (
//                 id CHAR(36) PRIMARY KEY,
//                 home_category_id CHAR(36) NOT NULL,
//                 store_id CHAR(36) NOT NULL,
//                 top TINYINT DEFAULT 1,
//                 status TINYINT DEFAULT 1,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                 FOREIGN KEY (home_category_id) REFERENCES home_categories(id)
//             );

export const getHomeCategoryStoreByIdHomeCategory = async (homeCategoryId) => {
    const [rows] = await connection.execute("SELECT * FROM home_category_store ORDER BY top WHERE home_category_id = ?", [homeCategoryId]);
    return rows;
};

// export const getHomeCategoryById = async (id) => {
//     const [rows] = await connection.execute("SELECT * FROM home_categories WHERE id = ?", [id]);
//     return rows;
// };

export const createHomeCategoryStore = async (id, home_category_id, store_id, top, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO home_category_store(id, home_category_id, store_id, top, status)
        VALUES(?, ?, ?, ?, ?);`,
        [id, home_category_id, store_id, top, status]
    );
    return rows.affectedRows > 0;
};

export const updateHomeCategoryStore = async (id, home_category_id, store_id, top, status) => {
    const [rows] = await connection.execute(`UPDATE home_category_store SET home_category_id = ?, store_id = ?, top = ?, status = ? WHERE id = ?`, [
        home_category_id,
        store_id,
        top,
        status,
        id,
    ]);
    return rows.affectedRows > 0;
};
