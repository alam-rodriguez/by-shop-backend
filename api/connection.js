import mysql from "mysql2/promise";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

import dotenv from "dotenv";
dotenv.config();

const connectionEnvironments = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

async function connectWithRetry() {
    let connection;
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            connection = await mysql.createConnection({
                // host: "mysql",
                // user: "root",
                // password: "123456789",
                // database: "francarlos_comunicaciones",
                host: connectionEnvironments.host, // Host de tu base de datos (puede ser una IP o dominio)
                user: connectionEnvironments.user, // Usuario de la base de datos
                password: connectionEnvironments.password, // Contraseña del usuario
                database: connectionEnvironments.database, // Nombre de la base de datos
            });
            console.log("Conectado a MySQL!");
            return connection;
        } catch (err) {
            console.log(`Intento ${i + 1} fallido: ${err.message}`);
            await new Promise((res) => setTimeout(res, RETRY_DELAY_MS));
        }
    }
    throw new Error("No se pudo conectar a MySQL después de varios intentos");
}

const connection = await connectWithRetry();

// export default connectWithRetry;

// Removed global connection declaration since it's not being used
// const connection = connectWithRetry();

// export default connection;

// export const connectToDatabase = connectWithRetry;

// import mysql from "mysql2/promise";

export const connectionForCreate = async () => {
    return await mysql.createConnection({
        host: connectionEnvironments.host, // Host de tu base de datos (puede ser una IP o dominio)
        user: connectionEnvironments.user, // Usuario de la base de datos
        password: connectionEnvironments.password,
        // host: "mysql", // nombre del servicio en docker-compose
        // user: "root",
        // password: "123456789",
    });
};

// const connection = await mysql.createConnection({
//     host: "localhost", // Host de tu base de datos (puede ser una IP o dominio)
//     user: "root", // Usuario de la base de datos
//     password: "123456789", // Contraseña del usuario
//     database: "francarlos_comunicaciones", // Nombre de la base de datos
// });

// const connection = await mysql.createConnection({
//     host: "mysql", // nombre del servicio en docker-compose
//     user: "root",
//     password: "123456789",
//     database: "francarlos_comunicaciones",
// });

export const connectToDatabase = async () => {
    return await mysql.createConnection({
        host: connectionEnvironments.host, // Host de tu base de datos (puede ser una IP o dominio)
        user: connectionEnvironments.user, // Usuario de la base de datos
        password: connectionEnvironments.password, // Contraseña del usuario
        database: connectionEnvironments.database, // Nombre de la base de datos
        // host: "mysql", // nombre del servicio en docker-compose
        // user: "root",
        // password: "123456789",
        // database: "francarlos_comunicaciones",
    });
};

export default connection;
