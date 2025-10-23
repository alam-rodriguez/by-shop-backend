import connection from "../../connection.js";

export const getGeneralCategoriesGroups = async () => {
    const [rows] = await connection.execute("SELECT * FROM general_categories_groups");
    return rows;
};

// CREATE TABLE general_categories_groups_categories (
//     id CHAR(36) NOT NULL PRIMARY KEY,
//     general_category_group_id CHAR(36) NOT NULL,
//     id_category CHAR(36) NOT NULL
// );

export const getGeneralCategoryGroupById = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
            gcg.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', c.id,
                    'name', c.name,
                    'description', c.description
                )
            ) AS categories
        FROM general_categories_groups gcg
        LEFT JOIN general_categories_groups_categories gcgc ON(gcgc.general_category_group_id = gcg.id)
        LEFT JOIN categories c ON(c.id = gcgc.id_category)
        WHERE gcg.id = ?
        GROUP BY gcg.id 
        LIMIT 1
    `,
        [id]
    );
    return rows;
};

export const createGeneralCategoryGroup = async (id, name, slug, description, status) => {
    const [rows] = await connection.execute(`INSERT INTO general_categories_groups(id, name, slug, description, status) VALUES(?, ?, ?, ?, ?)`, [
        id,
        name,
        slug,
        description,
        status,
    ]);
    return rows.affectedRows;
};

export const updateGeneralCategoryGroup = async (id, name, slug, description, status) => {
    const [result] = await connection.execute(`UPDATE general_categories_groups SET name = ?, slug = ?, description = ?, status = ? WHERE id = ?`, [
        name,
        slug,
        description,
        status,
        id,
    ]);
    return result.affectedRows;
};

export const getGeneralCategoriesGroupsForApp = async () => {
    const [rows] = await connection.execute(`SELECT 
            gcg.id,
            gcg.name,
            gcg.slug,
            gcg.description,
            gcg.status,
            GROUP_CONCAT(gcgc.id_category SEPARATOR ',') AS general_categories_ids
        FROM general_categories_groups gcg
        LEFT JOIN general_categories_groups_categories gcgc ON(gcgc.general_category_group_id = gcg.id)
        WHERE gcg.status = 1
        GROUP BY gcg.id
    `);
    return rows;
};

// CREATE TABLE articles_general_categories (
//                 id CHAR(36) NOT NULL PRIMARY KEY,
//                 id_article CHAR(36) NOT NULL,
//                 id_general_category CHAR(36) NOT NULL,
//                 status TINYINT NOT NULL
//             );

export const getCategoriesOfGeneralCategoryGroupForApp = async (id) => {
    const [rows] = await connection.execute(`SELECT 
            a.*
        FROM articles a
        INNER JOIN articles_general_categories agc ON (a.id = agc.id_article)
        INNER JOIN general_categories_groups_categories gcgc ON gcgc.id_category = agc.id_general_category
        INNER JOIN categories c ON (c.id = gcgc.id_category)
        WHERE a.status = 1 AND gcgc.general_category_group_id = '${id}'
    `);
    return rows;
};
