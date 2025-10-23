import connection from "../../connection.js";

export const getCategories = async () => {
    const [rows] = await connection.execute("SELECT * FROM categories");
    return rows;
};

export const getDirectCategories = async () => {
    const [rows] = await connection.execute("SELECT * FROM categories WHERE type = 1");
    return rows;
};

export const getIndirectCategories = async () => {
    const [rows] = await connection.execute("SELECT * FROM categories WHERE type = 2");
    return rows;
};

export const getIndirectCategoriesForAppHome = async () => {
    const [rows] = await connection.execute(`
        SELECT 
            c.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', a.id,
                'description', a.description,
                'main_image', a.main_image,
                'price', a.price
                )
            ) AS articles
        FROM categories AS c
        LEFT JOIN (
            SELECT 
                id,
                description,
                main_image,
                price,
                id_indirect_category
            FROM articles
            WHERE status = 1
            LIMIT 4
        ) AS a ON a.id_indirect_category = c.id

        WHERE type = 2 AND c.view = 1 AND c.status = 1
        GROUP BY c.id
    `);
    return rows;
};

export const getGeneralCategories = async () => {
    const [rows] = await connection.execute("SELECT * FROM categories WHERE type = 3");
    return rows;
};

export const getGeneralCategoriesOfArticle = async (idArticle) => {
    const [rows] = await connection.execute(
        `SELECT 
            c.* 
        FROM categories c
        INNER JOIN articles_general_categories agc ON (agc.id_general_category = c.id)
        WHERE agc.id_article = ? 
    `,
        [idArticle]
    );
    return rows;
};

export const getCategoryById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM categories WHERE id = ? LIMIT 1", [id]);
    return rows;
};

export const createCategory = async (id, slug, type, status, name, description, image, color, view, created_date) => {
    const [rows] = await connection.execute(
        `INSERT INTO categories(id, slug, type, status, name, description, image, color, view, created_date)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [id, slug, type, status, name, description, image, color, view, created_date]
    );
    return rows.affectedRows > 0;
};

export const updateCategory = async (id, status, name, description, image, color, view) => {
    const [rows] = await connection.execute(
        `UPDATE categories SET status = ?, name = ?, description = ?, image = ? , color = ?, view = ? WHERE id = ?`,
        [status, name, description, image, color, view, id]
    );
    return rows.affectedRows > 0;
};

export const changeSlugCategory = async (id, slug) => {
    const [rows] = await connection.execute(`UPDATE categories SET slug = ? WHERE id = ?`, [slug, id]);
    return rows.affectedRows;
};

export const changeStatusCategory = async (id, status) => {
    const [rows] = await connection.execute(`UPDATE categories SET status = ? WHERE id = ?`, [status, id]);
    return rows.affectedRows > 0;
};

export const getDirectCategoriesForApp = async () => {
    const [rows] = await connection.execute("SELECT * FROM categories WHERE type = 1 AND status = 1 AND view = 1 LIMIT 6");
    return rows;
};

export const getGeneralCategoriesAndArticles = async () => {
    const [rows] = await connection.execute(`
        -- SELECT 
        --     c.name AS nombre_categoria_general,
        --     JSON_ARRAYAGG(
        --         JSON_OBJECT(
        --             'id', a.id,
        --             'name', a.name,
        --             'main_image', a.main_image
        --         )
        --     ) AS articles
        -- FROM articles_general_categories agc
        -- LEFT JOIN categories c ON(c.id = agc.id_general_category)
        -- LEFT JOIN articles a ON(a.id = agc.id_article)
        -- WHERE a.status = 1 AND agc.status = 1 AND c.status = 1
        -- GROUP BY c.id

        WITH ranked_articles AS (
            SELECT 
                c.id AS id_categoria_general,
                c.name AS nombre_categoria_general,
                a.id AS article_id,
                a.description,
                a.main_image,
                a.price,
                ROW_NUMBER() OVER (PARTITION BY c.id ORDER BY a.id DESC) AS row_num
            FROM articles_general_categories agc
            LEFT JOIN categories c ON c.id = agc.id_general_category
            LEFT JOIN articles a ON a.id = agc.id_article
            WHERE a.status = 1 AND agc.status = 1 AND c.status = 1 AND c.view = 1
            )

            SELECT 
            nombre_categoria_general,
            id_categoria_general,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', article_id,
                'description', description,
                'main_image', main_image,
                'price', price
                )
            ) AS articles
            FROM ranked_articles
            WHERE row_num <= 3
            GROUP BY id_categoria_general, nombre_categoria_general;
    `);
    return rows;
};

// id CHAR(36) NOT NULL PRIMARY KEY,
// name VARCHAR(255) NOT NULL,
// description VARCHAR(255) NOT NULL,
// slug VARCHAR(255) NOT NULL UNIQUE,
// image VARCHAR(2083) NOT NULL,
// type TINYINT NOT NULL,
// color VARCHAR(55) NOT NULL,
// status TINYINT NOT NULL,
// view TINYINT NOT NULL,
// created_date DATETIME NOT NULL

export const getGeneralCategoriesAndCategories = async () => {
    const [rows] = await connection.execute(`
            WITH ranked_categories AS (
                SELECT 
                    gcgc.general_category_group_id,
                    c.id,
                    c.name,
                    c.description,
                    c.slug,
                    c.image,
                    c.type,
                    c.color,
                    c.view,
                    c.created_date,
                    ROW_NUMBER() OVER (
                        PARTITION BY gcgc.general_category_group_id 
                        ORDER BY c.created_date DESC
                    ) AS rn
                FROM general_categories_groups_categories gcgc
                JOIN categories c ON c.id = gcgc.id_category
            )
            SELECT 
                gcg.*,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', rc.id,
                        'name', rc.name,
                        'description', rc.description,
                        'slug', rc.slug,
                        'image', rc.image,
                        'type', rc.type,
                        'color', rc.color,
                        'status', rc.view,
                        'view', rc.view,
                        'created_date', rc.created_date
                    )
                ) AS categories
            FROM general_categories_groups gcg
            LEFT JOIN ranked_categories rc 
                ON rc.general_category_group_id = gcg.id AND rc.rn <= 4
            WHERE gcg.status = 1
            GROUP BY gcg.id

    ;`);
    return rows;
};

// export const getDepartments = async () => {
//     const [rows] = await connection.execute("SELECT * FROM categories WHERE type = 4");
//     return rows;
// };

export const getDepartments = async () => {
    const [rows] = await connection.execute("SELECT * FROM departments");
    return rows;
};

export const getDepartmentById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM departments WHERE id = ?", [id]);
    return rows;
};

export const createDepartment = async (id, slug, status, name, short_name, description, image, color, view) => {
    const [rows] = await connection.execute(
        `INSERT INTO departments(id, slug, status, name, short_name, description, image, color, view)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [id, slug, status, name, short_name, description, image, color, view]
    );
    return rows.affectedRows > 0;
};

export const updateDepartment = async (id, name, short_name, description, slug, image, color, status, view) => {
    const [rows] = await connection.execute(
        `UPDATE departments SET name = ?, short_name = ?, description = ?, slug = ?, image = ? , color = ?, status = ?, view = ? WHERE id = ?`,
        [name, short_name, description, slug, image, color, status, view, id]
    );
    return rows.affectedRows > 0;
};

export const createDirectCategoryDepartament = async (id, id_department, id_direct_category, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO directs_categories_department(id, id_department, id_direct_category, status)
        VALUES(?, ?, ?, ?);`,
        [id, id_department, id_direct_category, status]
    );
    return rows.affectedRows > 0;
};

export const deleteDirectCategoryDepartament = async (idDepartment, idCategory) => {
    const [rows] = await connection.execute(`DELETE FROM directs_categories_department WHERE id_department = ? AND id_direct_category = ?`, [
        idDepartment,
        idCategory,
    ]);
    return rows.affectedRows > 0;
};

export const getCategoriesByType = async (type) => {
    const [rows] = await connection.execute("SELECT * FROM categories WHERE type = ?", [type]);
    return rows;
};

export const getDirectsCategoriesByIdDepartment = async (idDepartment) => {
    const [rows] = await connection.execute(
        `SELECT 
                c.* 
            FROM directs_categories_department dcd
            INNER JOIN categories c ON (c.id = dcd.id_direct_category)
            WHERE dcd.id_department = ?
        `,
        [idDepartment]
    );
    return rows;
};
