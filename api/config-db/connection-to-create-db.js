import mysql from "mysql2/promise";
const connectionForCreate = await mysql.createConnection({
    host: "localhost", // Host de tu base de datos (puede ser una IP o dominio)
    user: "root", // Usuario de la base de datos
    password: "123456789", // Contraseña del usuario
});

export default connectionForCreate;
