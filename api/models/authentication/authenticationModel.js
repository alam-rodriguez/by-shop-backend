import connection from "../../connection.js";

export const userExists = async (email) => {
    // const [rows] = await connection.execute(`SELECT * FROM users WHERE email = ? AND email_verified = 1`, [email]);
    const [rows] = await connection.execute(`SELECT * FROM users WHERE email = ?`, [email]);
    return rows.length > 0;
};

export const userEmailIsVerified = async (email) => {
    const [rows] = await connection.execute(`SELECT * FROM users WHERE email = ? AND email_verified = 1`, [email]);
    return rows.length > 0;
};

export const getUser = async (email) => {
    const [rows] = await connection.execute(`SELECT * FROM users WHERE email = ? AND email_verified = 1 LIMIT 1`, [email]);
    return rows[0];
};

export const createUser = async (id, email, password, first_name, last_name, type, can_buy, direction) => {
    const [rows] = await connection.execute(
        `INSERT INTO users(id, email, password, first_name, last_name, type, can_buy, direction) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, email, password, first_name, last_name, type, can_buy, direction]
    );
    return rows.affectedRows > 0;
};

export const createEmailVerificationCode = async (id, email, code, expiration_date) => {
    const [rows] = await connection.execute(`INSERT INTO users_codes_verification(id, email, code, expiration_date) VALUES(?, ?, ?, ?)`, [
        id,
        email,
        code,
        expiration_date,
    ]);
    return rows.affectedRows > 0;
};

export const emailHasVerificationCode = async (email) => {
    console.log(email);
    console.log("-------------------------------------------");
    const [rows] = await connection.execute(
        `SELECT * FROM users_codes_verification WHERE email = ? AND expiration_date > NOW() ORDER BY created_at DESC LIMIT 1`,
        [email]
    );
    return rows.length > 0;
};

export const getEmailVerificationCode = async (email) => {
    const [rows] = await connection.execute(
        `SELECT * FROM users_codes_verification WHERE email = ? AND expiration_date > NOW() ORDER BY created_at DESC LIMIT 1`,
        [email]
    );
    return rows;
};

export const getUserInformation = async (id) => {
    const [rows] = await connection.execute(
        `SELECT 
            c.*,
            JSON_OBJECT(
                'id', ua.id,
                'id_user', ua.id_user,
                'country', ua.country,
                'full_name', ua.full_name,
                'number', ua.number,
                'address_1', ua.address_1,
                'address_2', ua.address_2,
                'neighborhood', ua.neighborhood,
                'province', ua.province,
                'postal_code', ua.postal_code,
                'preferred_address', ua.preferred_address,
                'status', ua.status,
                'created_at', ua.created_at
            ) AS address
        FROM users c
        LEFT JOIN users_addresses ua 
            ON ua.id = (
                SELECT id 
                FROM users_addresses 
                WHERE id_user = c.id 
                ORDER BY preferred_address DESC, created_at DESC 
                LIMIT 1
            )
        WHERE c.id = ? AND c.email_verified = 1
        LIMIT 1;
    `,
        [id]
    );
    return rows;
};

// CREATE TABLE users_codes_verification(
//   id char(36) NOT NULL PRIMARY KEY,
//   email VARCHAR(255) NOT NULL,
//   code VARCHAR(6) NOT NULL,
//   expiration_date DATETIME NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE users_codes_verification(
//                 id char(36) NOT NULL PRIMARY KEY,
//                 email VARCHAR(255) NOT NULL,
//                 code VARCHAR(6) NOT NULL,
//                 expiration_date DATETIME NOT NULL,
//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );

export const userHasGoogleId = async (email, googleId) => {
    const [rows] = await connection.execute(`SELECT * FROM users WHERE email = ? AND google_id != null LIMIT 1`, [email, googleId]);
    return rows.length > 0;
};
