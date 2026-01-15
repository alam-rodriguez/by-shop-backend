// Connection
import connection from "../../connection.js";

// CREATE TABLE delivery_applications (
//                 id CHAR(36) NOT NULL PRIMARY KEY,

//                 user_id CHAR(36) NOT NULL,
//                 full_name VARCHAR(100) NOT NULL,
//                 dni_number VARCHAR(20) NOT NULL,
//                 phone_number VARCHAR(15) NOT NULL,
//                 email VARCHAR(255) NOT NULL,

//                 vehicle_type ENUM('motorcycle', 'car', 'bicycle') NOT NULL,
//                 vehicle_brand VARCHAR(50) NOT NULL,
//                 vehicle_model VARCHAR(50) NOT NULL,
//                 vehicle_plate VARCHAR(20) NOT NULL,

//                 country_id CHAR(36) NOT NULL,
//                 province_id CHAR(36) NOT NULL,
//                 municipality_id CHAR(36) NOT NULL,
//                 neighborhood_id CHAR(36) NOT NULL,

//                 address_details VARCHAR(255) NOT NULL,

//                 -- Se almacenan como URL o path (aunque el validador permita archivo)
//                 image_from_dni VARCHAR(255) NOT NULL,
//                 image_back_dni VARCHAR(255) NOT NULL,
//                 image_plate VARCHAR(255) NOT NULL,

//                 has_license TINYINT(1) NOT NULL DEFAULT 1,
//                 has_insurance TINYINT(1) NOT NULL DEFAULT 0,

//                 status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',

//                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//             );

export const createDeliveryApplication = async (
    id,
    user_id,
    full_name,
    dni_number,
    phone_number,
    email,
    vehicle_type,
    vehicle_brand,
    vehicle_model,
    vehicle_plate,
    country_id,
    province_id,
    municipality_id,
    neighborhood_id,
    address_details,
    image_from_dni,
    image_back_dni,
    image_plate,
    has_license,
    has_insurance
) => {
    const [rows] = await connection.execute(
        `INSERT INTO delivery_applications(
        id, user_id, full_name, dni_number, phone_number, email, vehicle_type, vehicle_brand, vehicle_model, vehicle_plate, country_id, province_id, municipality_id, neighborhood_id, address_details, image_from_dni, image_back_dni, image_plate, has_license, has_insurance
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            user_id,
            full_name,
            dni_number,
            phone_number,
            email,
            vehicle_type,
            vehicle_brand,
            vehicle_model,
            vehicle_plate,
            country_id,
            province_id,
            municipality_id,
            neighborhood_id,
            address_details,
            image_from_dni,
            image_back_dni,
            image_plate,
            has_license,
            has_insurance,
        ]
    );
    return rows.affectedRows > 0;
};

export const getDeliveryApplications = async (userId) => {
    const [rows] = await connection.execute(
        `
            SELECT * FROM delivery_applications WHERE user_id = ? ORDER BY created_at DESC
        `,
        [userId]
    );
    return rows;
};

export const getDeliveryApplicationByApplicationId = async (id) => {
    const [rows] = await connection.execute(
        `
            SELECT * FROM delivery_applications WHERE id = ?
        `,
        [id]
    );
    return rows;
};

export const getAllDeliveryApplications = async () => {
    const [rows] = await connection.execute(
        `
            SELECT * FROM delivery_applications ORDER BY created_at DESC
        `
    );
    return rows;
};

export const updateStatusDeliveryApplication = async (id, status) => {
    const [rows] = await connection.execute(`UPDATE delivery_applications SET status = ? WHERE id = ?`, [status, id]);
    return rows.affectedRows > 0;
};
