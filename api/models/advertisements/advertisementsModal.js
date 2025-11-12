import connection from "../../connection.js";

export const createAdvertisement = async (id, name, description, article_id, link, sort_order, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO advertisements(id, name, description, article_id, link, sort_order, status) VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [id, name, description, article_id, link, sort_order, status]
    );
    return rows.affectedRows > 0;
};

export const updateAdvertisement = async (id, name, description, article_id, link, sort_order, status) => {
    const [rows] = await connection.execute(
        `UPDATE advertisements SET name = ?, description = ?, article_id = ?, link = ?, sort_order = ?, status = ? WHERE id = ?`,
        [name, description, article_id, link, sort_order, status, id]
    );
    return rows.affectedRows > 0;
};

export const getAdvertisements = async () => {
    const [rows] = await connection.execute("SELECT * FROM advertisements");
    return rows;
};

export const getAdvertisementById = async (id) => {
    const [rows] = await connection.execute("SELECT * FROM advertisements WHERE id = ?", [id]);
    return rows;
};

export const getAdvertisementsForApp = async () => {
    const [rows] = await connection.execute(`
        SELECT 
            ads.id, 
            ads.name, 
            ads.description,
            ads.link,
            at.main_image AS article_image 
        FROM advertisements AS ads 
        LEFT JOIN articles AS at ON(at.id = ads.article_id)
        
        `);
    return rows;
};
