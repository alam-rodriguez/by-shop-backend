import connection from "../../connection.js";

export const getOptions = async () => {
    const [rows] = await connection.execute(`SELECT 
            o.*,
            oc.name AS 'category'
        FROM options o
        LEFT JOIN options_categories oc ON (oc.id = o.id_option_category)
    `);
    return rows;
};

export const getOptionById = async (id) => {
    const [rows] = await connection.execute(
        `SELECT * FROM options WHERE id = ? LIMIT 1
    `,
        [id]
    );
    return rows;
};

export const createOption = async (id, name, require_image, require_color, require_quantity, require_price, id_option_category, type, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO options(id, name, require_image, require_color, require_quantity, require_price, id_option_category, type, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, require_image, require_color, require_quantity, require_price, id_option_category, type, status]
    );
    return rows.affectedRows;
};

export const updateOption = async (id, name, id_option_category, require_image, require_color, require_quantity, require_price, type, status) => {
    const [result] = await connection.execute(
        `UPDATE options SET name = ?, id_option_category = ?, require_image = ?, require_color = ?, require_quantity = ?, require_price = ?, type = ?, status = ? WHERE id = ?`,
        [name, id_option_category, require_image, require_color, require_quantity, require_price, type, status, id]
    );
    return result.affectedRows;
};

// valores de las opciones
export const getValuesOPtions = async () => {
    const [rows] = await connection.execute(`SELECT 
            ov.*,
            o.name AS 'option' 
        FROM options_values ov
        LEFT JOIN options o ON (o.id = ov.id_option)
        `);
    return rows;
};

export const getValueOption = async (id) => {
    const [rows] = await connection.execute(`SELECT * FROM options_values LIMIT 1`, [id]);
    return rows;
};

export const createValueOption = async (id, name, value, id_option, status) => {
    const [rows] = await connection.execute(`INSERT INTO options_values(id, name, value, id_option, status) VALUES(?, ?, ?, ?, ?)`, [
        id,
        name,
        value,
        id_option,
        status,
    ]);
    return rows.affectedRows;
};

export const updateValueOption = async (id, name, value, id_option, status) => {
    const [result] = await connection.execute(`UPDATE options_values SET name = ?, value = ?, id_option = ?, status = ? WHERE id = ?`, [
        name,
        value,
        id_option,
        status,
        id,
    ]);
    return result.affectedRows;
};
