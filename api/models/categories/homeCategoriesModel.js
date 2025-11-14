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

export const getHomeCategoryStoreByIdHomeCategory = async (homeCategoryId) => {
    const [rows] = await connection.execute("SELECT * FROM home_category_store ORDER BY top WHERE home_category_id = ?", [homeCategoryId]);
    return rows;
};

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

export const getHomeCategoryStore = async (homeCategoryId) => {
    const [rows] = await connection.execute("SELECT * FROM home_category_store WHERE home_category_id = ?", [homeCategoryId]);
    return rows;
};

export const getHomeCategoriesForApp = async () => {
    const [rows] = await connection.execute(`
        WITH ranked AS (
            SELECT
                hcs.home_category_id,
                a.id AS article_id,
                a.name,
                a.price,
                a.description,
                a.main_image,
                ROW_NUMBER() OVER (
                    PARTITION BY hcs.home_category_id 
                    ORDER BY hcs.top DESC
                ) AS rn
            FROM home_category_store hcs
            JOIN articles a ON a.id = hcs.store_id
            WHERE hcs.status = 1
        )
        SELECT 
            hc.id,
            hc.name,
            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', r.article_id,
                        'name', r.name,
                        'price', r.price,
                        'description', r.description,
                        'main_image', r.main_image
                    )
                )
                FROM (
                    SELECT *
                    FROM ranked
                    WHERE home_category_id = hc.id AND rn <= 4
                    ORDER BY rn
                ) AS r
            ) AS articles
        FROM home_categories hc
        WHERE hc.status = 1
        ORDER BY hc.sort_order;
    `);
    return rows;
};
