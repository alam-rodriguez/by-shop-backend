import mysql from "mysql2/promise";

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

async function connectWithRetry() {
    let connection;
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            connection = await mysql.createConnection({
                host: "mysql",
                user: "root",
                password: "123456789",
                database: "francarlos_comunicaciones",
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
        // host: "localhost", // Host de tu base de datos (puede ser una IP o dominio)
        // user: "root", // Usuario de la base de datos
        // password: "123456789",
        host: "mysql", // nombre del servicio en docker-compose
        user: "root",
        password: "123456789",
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
        // host: "localhost", // Host de tu base de datos (puede ser una IP o dominio)
        // user: "root", // Usuario de la base de datos
        // password: "123456789", // Contraseña del usuario
        // database: "francarlos_comunicaciones", // Nombre de la base de datos
        host: "mysql", // nombre del servicio en docker-compose
        user: "root",
        password: "123456789",
        database: "francarlos_comunicaciones",
    });
};

export default connection;
