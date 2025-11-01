import connection from "../../connection.js";

export const getCountries = async () => {
    const [rows] = await connection.execute(`SELECT * from countries`);
    return rows;
};

export const getCountryById = async (id) => {
    const [rows] = await connection.execute(`SELECT * from countries WHERE id = ?`, [id]);
    return rows;
};

export const createCountry = async (id, name, description, iso_code, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO countries(id, name, description, iso_code, latitude, longitude, status) VALUE(?,?,?,?,?,?,?)`,
        [id, name, description, iso_code, latitude, longitude, status]
    );
    return rows.affectedRows;
};

export const updateCountry = async (id, name, description, iso_code, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `UPDATE countries SET name = ?, description = ?,  iso_code = ?, latitude = ?, longitude = ?, status = ? WHERE id = ?`,
        [name, description, iso_code, latitude, longitude, status, id]
    );
    return rows.affectedRows;
};

export const getProvinces = async () => {
    const [rows] = await connection.execute(`
        SELECT 
            p.*,
            c.name AS country
        from provinces AS p
        LEFT JOIN countries AS c ON(c.id = p.country_id)
        `);
    return rows;
};

export const getProvinceById = async (id) => {
    const [rows] = await connection.execute(`SELECT * from provinces WHERE id = ?`, [id]);
    return rows;
};

export const createProvince = async (id, country_id, name, description, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO provinces(id, country_id, name, description, latitude, longitude, status) VALUE(?,?,?,?,?,?,?)`,
        [id, country_id, name, description, latitude, longitude, status]
    );
    return rows.affectedRows;
};

export const updateProvinces = async (id, country_id, name, description, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `UPDATE provinces SET country_id = ?, name = ?, description = ?, latitude = ?, longitude = ?, status = ? WHERE id = ?`,
        [country_id, name, description, latitude, longitude, status, id]
    );
    return rows.affectedRows;
};

export const getMunicipalities = async () => {
    const [rows] = await connection.execute(`
        SELECT 
            m.*,
            p.name AS province
        from municipalities AS m
        LEFT JOIN provinces AS p ON(p.id = m.province_id)
        `);
    return rows;
};

export const getMunicipalityById = async (id) => {
    const [rows] = await connection.execute(`SELECT * from municipalities WHERE id = ?`, [id]);
    return rows;
};

export const createMunicipality = async (id, province_id, name, description, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO municipalities(id, province_id, name, description, latitude, longitude, status) VALUE(?,?,?,?,?,?,?)`,
        [id, province_id, name, description, latitude, longitude, status]
    );
    return rows.affectedRows;
};

export const updateMunicipality = async (id, province_id, name, description, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `UPDATE municipalities SET province_id = ?, name = ?, description = ?, latitude = ?, longitude = ?, status = ? WHERE id = ?`,
        [province_id, name, description, latitude, longitude, status, id]
    );
    return rows.affectedRows;
};

export const getNeighborhoods = async () => {
    const [rows] = await connection.execute(`
        SELECT 
            n.*,
            m.name AS municipality
        from neighborhoods AS n
        LEFT JOIN municipalities AS m ON(m.id = n.municipality_id)
        `);
    return rows;
};

export const getNeighborhoodById = async (id) => {
    const [rows] = await connection.execute(`SELECT * from neighborhoods WHERE id = ?`, [id]);
    return rows;
};

export const createNeighborhood = async (id, municipality_id, name, description, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `INSERT INTO neighborhoods(id, municipality_id, name, description, latitude, longitude, status) VALUE(?,?,?,?,?,?,?)`,
        [id, municipality_id, name, description, latitude, longitude, status]
    );
    return rows.affectedRows;
};

export const updateNeighborhood = async (id, municipality_id, name, description, latitude, longitude, status) => {
    const [rows] = await connection.execute(
        `UPDATE neighborhoods SET municipality_id = ?, name = ?, description = ?, latitude = ?, longitude = ?, status = ? WHERE id = ?`,
        [municipality_id, name, description, latitude, longitude, status, id]
    );
    return rows.affectedRows;
};

export const getProvincesByIdCountry = async (countryId) => {
    const [rows] = await connection.execute(`SELECT * FROM provinces WHERE country_id = ?`, [countryId]);
    return rows;
};

export const getMunicipalitiesByIdProvince = async (provinceId) => {
    const [rows] = await connection.execute(`SELECT * FROM municipalities WHERE province_id = ?`, [provinceId]);
    return rows;
};

export const getNeighborhoodsByIdMunicipality = async (municipalityId) => {
    const [rows] = await connection.execute(`SELECT * FROM neighborhoods WHERE municipality_id = ?`, [municipalityId]);
    return rows;
};
