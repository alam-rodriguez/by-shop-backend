import express from "express";
export const app = express();
import cookieParser from "cookie-parser";
import "./web-push/webPush.js";

import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// WebSockets funcionando
// io.on("connection", (socket) => {
//     console.log("Cliente conectado", socket.id);
// });

// io.on("connection", (socket) => {
//     // usuario entra a un chat
//     socket.on("joinChat", (chatId) => {
//         socket.join(`chat_${chatId}`);
//         console.log(`Socket ${socket.id} joined room chat_${chatId}`);
//         io.to(chatId).emit("newMessage", savedMessage);
//     });
// });
// io.on("connection", (socket) => {
//     socket.on("joinChat", (chatId) => {
//         socket.join(`chat_${chatId}`);
//         console.log(`Socket ${socket.id} joined room chat_${chatId}`);
//     });

//     socket.on("sendMessage", (data) => {
//         const { chatId, senderId, message } = data;

//         // Solo se propaga a los participantes
//         io.to(`chat_${chatId}`).emit("newMessage", {
//             chatId,
//             senderId,
//             message,
//         });
//     });
// });

socketHandler(io);

import jwt from "jsonwebtoken";

import { connectionForCreate, connectToDatabase } from "./connection.js";
import cors from "cors";
// import connection from "./config-db/connection.js";
// import { connectionForCreate } from "./connection.js";
// import connectionForCreate from "./config-db/connection-to-create-db.js";

// import { connectToDatabase } from "./connection.js";

// const connection = await connectToDatabase();
// async function main() {
//   // aquí usas `connection` para tus queries
// }

// main();

// TODO: LAS OPCIONES NO DEBEN DE TENER TIPO, MAS BIEN DEBEN DE INDICAR SI REQUIEREN IMAGEN Y SI REQUIEREN COLOR

// app.use(cors());
app.use(
    cors({
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        origin: [
            "http://localhost:3000",
            "http://192.168.16.63:3000",
            "http://192.168.16.63:8080",
            "https://f25d1c4a178a.ngrok-free.app",
            "https://33105c2a514f.ngrok-free.app",
            "http://192.168.16.63",
            "http://172.25.184.72:3000",
            "https://5e24b7e57dd5.ngrok-free.app",
            "http://64.227.53.125:3000",
            "https://9425967bc6e4.ngrok-free.app",
            "https://byshop.online",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Routes
import appDataRoutes from "./routes/app-data/appDataRoutes.js";
import shopsRoutes from "./routes/shops/shopsRoutes.js";
import usersRoutes from "./routes/users/usersRoutes.js";
import categoriesRoutes from "./routes/categories/categoriesRoutes.js";
import articlesRoutes from "./routes/articles/articlesRoutes.js";
import brandsRoutes from "./routes/brands/brandsRoutes.js";
import modelsRoutes from "./routes/models/modelsRoutes.js";
import optionsRoutes from "./routes/options/optionsRoutes.js";
import paymentMethodRoutes from "./routes/payment-methods/paymentMethodRoutes.js";
import cartsRoutes from "./routes/carts/cartsRoutes.js";
import offersRoutes from "./routes/offers/offersRoutes.js";
import authenticationRoutes from "./routes/authentication/authentication.js";
import currenciesRoutes from "./routes/currencies/currenciesRoutes.js";
import paypalRoutes from "./payments/paypalRoutes.js";
import searchHistoryRoutes from "./routes/search-history/searchHistoryRoutes.js";
import deliveriesRoutes from "./routes/delivery/deliveryRoutes.js";
import locationsRoutes from "./routes/locations/locationsRoutes.js";
import webPushNotification from "./routes/web-push/webPushRoutes.js";
import advertisementsRoutes from "./routes/advertisements/advertisementsRoutes.js";
import chatsRoutes from "./routes/chats/chatsRoutes.js";
import periodsRoutes from "./routes/periods/periodsRoutes.js";

import { socketHandler } from "./sockets/index.js";

// Middlewares
// app.use((req, res, next) => {
//     console.log("Authentication Middleware");
//     const token = req.cookies.access_token;
//     console.log("Token recibido:", token);
//     req.session = { id: null, email: null };

//     if (!token) {
//         console.log("No hay token");
//         return next(); // continua sin autenticar
//     }

//     try {
//         const data = jwt.verify(token, "secret");
//         console.log("Payload del token:", data);
//         req.session.id = data.id;
//         req.session.email = data.email;
//         console.log("ID de usuario:", req.session.id);
//         console.log("Email de usuario:", req.session.email);

//         console.log(data);
//     } catch (error) {
//         console.log("Error al verificar token:", error.message);
//     }

//     next();
// });

app.use((req, res, next) => {
    console.log("Authentication Middleware");
    const access_token = req.cookies.access_token;
    const refresh_token = req.cookies.refresh_token;

    req.session = { id: null, email: null };

    if (!access_token && !refresh_token) {
        console.log("No hay access_token ni refresh_token");
        return next();
    }

    if (access_token) {
        console.log("Token recibido:", access_token);

        try {
            const data = jwt.verify(access_token, "secret");
            console.log("Payload del access_token:", data);
            req.session.id = data.id;
            req.session.email = data.email;
            return next();
        } catch (error) {
            console.log("Error al verificar access_token:", error.message);
        }
    }

    try {
        const data = jwt.verify(refresh_token, "secret_refresh");
        console.log("Payload del access_token:", data);
        req.session.id = data.id;
        req.session.email = data.email;
        const newAccessToken = jwt.sign({ id: data.id, email: data.email }, "secret", { expiresIn: "1h" });
        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1 hora
        });
    } catch (error) {
        console.log("Error al verificar refresh_token:", error.message);
    }

    return next();

    // res.clearCookie("access_token");
    // res.clearCookie("refresh_token");
});

// Users routes
app.use("/api/users", usersRoutes);

// Shops routes
app.use("/api/shops", shopsRoutes);

// app routes
app.use("/api/app-data", appDataRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/offers", offersRoutes);
app.use("/api/models", modelsRoutes);
app.use("/api/options", optionsRoutes);
app.use("/api/payment-methods", paymentMethodRoutes);
app.use("/api/currencies", currenciesRoutes);

// Comprars
app.use("/api/carts", cartsRoutes);

// Comprars
app.use("/api/deliveries", deliveriesRoutes);

// Authentication routes
app.use("/api/auth", authenticationRoutes);

// Authentication routes
app.use("/api/payments/paypal", paypalRoutes);

// Search History
app.use("/api/search-history", searchHistoryRoutes);

// Search History
app.use("/api/locations", locationsRoutes);

// Search History
app.use("/api/web-push-notification", webPushNotification);

// AdvertisementsRoutes
app.use("/api/advertisements", advertisementsRoutes);

// Chats
app.use("/api/chats", chatsRoutes);

// Periods
app.use("/api/periods", periodsRoutes);

app.get("/api/exist", async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`
            SELECT SCHEMA_NAME 
        FROM information_schema.SCHEMATA 
        WHERE SCHEMA_NAME = 'byshop_db';
    `);
        if (rows.length > 0) res.send("existe");
        else res.send("No existe");
    } catch (error) {
        res.send("No existe");
    }
});

app.post("/api/seed", async (req, res) => {
    try {
        const connectionForCreateDB = await connectionForCreate();
        // await connectionForCreateDB.execute("CREATE DATABASE IF NOT EXISTS francarlos_comunicaciones;");
        await connectionForCreateDB.execute("CREATE DATABASE IF NOT EXISTS byshop_db;");

        await connectionForCreateDB.end();

        const connection = await connectToDatabase();
        // await connection.execute("USE francarlos_comunicaciones;");
        await connection.execute(`
            CREATE TABLE app_data(
                app_name VARCHAR(255) NOT NULL,
                promotions_on_view JSON,
                commissions JSON
            );
        `);
        await connection.execute(`
            INSERT INTO app_data(app_name, promotions_on_view, commissions) 
            VALUES(
                "FrancarlosApp",
                "[]",
                "[]"
            );
        `);
        // await connection.execute(`
        //     CREATE TABLE shops(
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         name VARCHAR(255) NOT NULL,
        //         logo VARCHAR(2083) NOT NULL,
        //         create_date DATETIME NOT NULL,
        //         type TINYINT NOT NULL,
        //         status TINYINT NOT NULL
        //     );
        // `);
        // await connection.execute(`
        //     CREATE TABLE shops(
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         name VARCHAR(255) NOT NULL,
        //         description VARCHAR(255) NOT NULL,
        //         logo VARCHAR(2083) NOT NULL,
        //         type TINYINT NOT NULL,
        //         status TINYINT NOT NULL,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     );
        // `);

        await connection.execute(`
            CREATE TABLE shops(
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                logo VARCHAR(2083) NOT NULL,
                type TINYINT NULL,
                country_id char(36) NOT NULL,
                province_id char(36) NOT NULL,
                municipality_id char(36) NOT NULL,
                district_id char(36),
                neighborhood_id char(36) NOT NULL,
                street VARCHAR(255) NOT NULL,
                local_number VARCHAR(50),
                address_details VARCHAR(255),
                postal_code VARCHAR(6),
                phone_number VARCHAR(20) NOT NULL,
                latitude DECIMAL(10,8) NOT NULL,
                longitude DECIMAL(11,8) NOT NULL,
                plan_id CHAR(36) NOT NULL,
                status TINYINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE users (
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         first_names VARCHAR(255) NOT NULL,
        //         last_names VARCHAR(255) NOT NULL,
        //         registration_date DATETIME NOT NULL,
        //         type TINYINT NOT NULL,
        //         can_buy TINYINT NOT NULL,
        //         email VARCHAR(255) NOT NULL,
        //         password TEXT,
        //         direction JSON
        //     );
        // `);

        await connection.execute(`
            CREATE TABLE categories(
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL, 
                description VARCHAR(255) NOT NULL, 
                slug VARCHAR(255) NOT NULL UNIQUE,
                image VARCHAR(2083),
                type TINYINT NOT NULL,
                color VARCHAR(55) NOT NULL,
                status TINYINT NOT NULL,
                view TINYINT NOT NULL,
                created_date DATETIME NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE brands(
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL, 
                description VARCHAR(255) NOT NULL, 
                image VARCHAR(2083),
                status TINYINT NOT NULL,
                created_date DATETIME NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE models(
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL, 
                description VARCHAR(255) NOT NULL,
                id_brand CHAR(36) NOT NULL, 
                image VARCHAR(2083),
                status TINYINT NOT NULL,
                created_date DATETIME NOT NULL
            );
        `);
        // await connection.execute(`
        //     CREATE TABLE options (
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         name VARCHAR(55) NOT NULL,
        //         type TINYINT NOT NULL,
        //         id_option_category CHAR(36) NOT NULL,
        //         status TINYINT NOT NULL
        //     );
        // `);
        await connection.execute(`
            CREATE TABLE options (
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(55) NOT NULL,
                require_image TINYINT NOT NULL DEFAULT 0,
                require_color TINYINT NOT NULL DEFAULT 0,
                require_quantity TINYINT NOT NULL DEFAULT 0,
                require_price TINYINT NOT NULL DEFAULT 0,
                type TINYINT NOT NULL,
                id_option_category CHAR(36) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE options_values (
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(55) NOT NULL,
                value VARCHAR(55) NOT NULL,
                id_option CHAR(36) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE options_values (
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         id_option CHAR(36) NOT NULL,
        //         value VARCHAR(255) NOT NULL
        //     );
        // `);

        //!TODO: TABLA PARA MONEDAS
        await connection.execute(`
            CREATE TABLE currencies (
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(55) NOT NULL,
                description VARCHAR(255) NOT NULL,
                symbol VARCHAR(55) NOT NULL,
                exchange_rate DECIMAL(10, 6) NOT NULL CHECK (exchange_rate > 0),
                iso_code CHAR(3) NOT NULL UNIQUE,
                main_currency TINYINT NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE payment_methods (
        //         id CHAR(36) NOT NULL,
        //         name VARCHAR(55) NOT NULL NOT NULL,
        //         description VARCHAR(255) NOT NULL NOT NULL,
        //         type TINYINT NOT NULL,
        //         status TINYINT NOT NULL
        //     );
        // `);
        await connection.execute(`
            CREATE TABLE payment_methods (
                id CHAR(36) NOT NULL,
                name VARCHAR(55) NOT NULL,
                description VARCHAR(255) NOT NULL,
                type TINYINT NOT NULL,
                require_image TINYINT NOT NULL,
                -- require_bank TINYINT(1) NOT NULL DEFAULT 0,
                bank_name VARCHAR(55),
                is_paypal_method TINYINT(1) NOT NULL DEFAULT 0,
                bank_account INT,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE articles (
                id CHAR(36) NOT NULL PRIMARY KEY,
                status TINYINT NOT NULL,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                id_direct_category CHAR(36) NOT NULL,
                id_indirect_category CHAR(36) NOT NULL,
                id_currency CHAR(36) NOT NULL,
                id_payment_method CHAR(36) NOT NULL,
                main_image VARCHAR(2083) NOT NULL,
                id_model CHAR(36) NOT NULL,
                view TINYINT NOT NULL,
                -- price FLOAT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                quantity INT NOT NULL, 
                id_shop CHAR(36) NOT NULL,
                additional_details TEXT,
                created_date DATETIME NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE articles_general_categories (
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_article CHAR(36) NOT NULL,
                id_general_category CHAR(36) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE box_contents (
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_article CHAR(36) NOT NULL,
                id_article_content CHAR(36) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE images_articles (
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_article CHAR(36) NOT NULL,
                image VARCHAR(2083) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE options_articles (
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_article CHAR(36) NOT NULL,
                id_option CHAR(36) NOT NULL,
                id_value CHAR(36) NOT NULL,
                image VARCHAR(2083),
                quantity INT, 
                price FLOAT,
                color VARCHAR(55),
                status TINYINT NOT NULL
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE articles_specs (
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         id_article CHAR(36) NOT NULL,
        //         id_option CHAR(36) NOT NULL,
        //         id_value CHAR(36) NOT NULL,
        //         type TINYINT NOT NULL,
        //         status TINYINT NOT NULL
        //     );
        // `);
        await connection.execute(`
            CREATE TABLE articles_specs (
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_article CHAR(36) NOT NULL,
                id_option CHAR(36) NOT NULL,
                id_value CHAR(36) NOT NULL,
                is_spec BOOLEAN NOT NULL DEFAULT 0 ,
                is_measurement BOOLEAN NOT NULL DEFAULT 0,
                is_highlight BOOLEAN NOT NULL DEFAULT 0,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE general_categories_groups (
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE general_categories_groups_categories (
                id CHAR(36) NOT NULL PRIMARY KEY,
                general_category_group_id CHAR(36) NOT NULL,
                id_category CHAR(36) NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE article_measurements(
                id char(36) NOT NULL PRIMARY KEY,
                id_article char(36) NOT NULL,
                id_option char(36) NOT NULL,
                id_value char(36) NOT NULL,
                type TINYINT NOT NULL,
                status tinyint NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE article_highlighted_paragraphs(
                id char(36) NOT NULL PRIMARY KEY,
                id_article char(36) NOT NULL,
                paragraph TEXT,
                status tinyint NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE option_categories(
                id char(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                status TINYINT NOT NULL
            );
        `);
        await connection.execute(`
            CREATE TABLE options_categories(
                id char(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE carts(
                id char(36) NOT NULL PRIMARY KEY,
                id_article char(36) NOT NULL,
                id_user char(36) NOT NULL,
                status TINYINT NOT NULL,
                quantity INT UNSIGNED NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`
            CREATE TABLE cart_item_options(
                id char(36) NOT NULL PRIMARY KEY,
                id_article char(36) NOT NULL,
                id_user char(36) NOT NULL,
                id_cart char(36) NOT NULL,
                id_article_option char(36) NOT NULL,
                status TINYINT NOT NULL,
                id_option char(36) NOT NULL,
                id_value char(36) NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE carts_bought(
                id char(36) NOT NULL PRIMARY KEY,
                id_user char(36) NOT NULL,
                status TINYINT NOT NULL,
                id_pay_method char(36) NOT NULL,
                total DECIMAL(10,2) NOT NULL,
                total_discount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                paypal_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                paypal_payment_id VARCHAR(255) DEFAULT NULL,
                delivery_cost DECIMAL(10,2) NOT NULL DEFAULT 0.00,
                delivery_distance DECIMAL(8,2) DEFAULT 0.00,
                image VARCHAR(2083),
                status_image TINYINT DEFAULT NULL,
                id_currency char(36) NOT NULL,
                want_use_address TINYINT NOT NULL DEFAULT 0,
                id_address_user char(36) DEFAULT NULL,
                id_shop_for_address char(36) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // ALTER TABLE carts_bought
        // ADD COLUMN total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        // ADD COLUMN total_discount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
        // ADD COLUMN paypal_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00;

        await connection.execute(`
            CREATE TABLE carts_bought_items(
                id char(36) NOT NULL PRIMARY KEY,
                id_cart_bought char(36) NOT NULL,
                id_cart char(36) NOT NULL,
                price_item DECIMAL(10,2) NOT NULL,
                price_options DECIMAL(10,2) NOT NULL,
                quantity INT UNSIGNED NOT NULL,
                total_price DECIMAL(10,2) NOT NULL,
                id_offer char(36) DEFAULT NULL,
                percent_discount DECIMAL(5,2) DEFAULT 0.00,
                total_price_with_discount DECIMAL(10,2) NOT NULL,
                status TINYINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE carts_bought_items(
        //         id char(36) NOT NULL PRIMARY KEY,
        //         id_cart_bought char(36) NOT NULL,
        //         id_cart char(36) NOT NULL,
        //         price DECIMAL(10,2) NOT NULL,
        //         id_offer char(36) DEFAULT NULL,
        //         percent_discount DECIMAL(5,2) DEFAULT 0.00,
        //         price_with_discount DECIMAL(10,2) DEFAULT 0.00,
        //         status TINYINT NOT NULL,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     );
        // `);

        await connection.execute(`
            CREATE TABLE articles_list_users(
                id char(36) NOT NULL PRIMARY KEY,
                id_user char(36) NOT NULL,
                id_article char(36) NOT NULL,
                status TINYINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`
            CREATE TABLE departments(
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL, 
                short_name VARCHAR(255), 
                description VARCHAR(255) NOT NULL, 
                slug VARCHAR(255) NOT NULL UNIQUE,
                image VARCHAR(2083) NOT NULL,
                color VARCHAR(55) NOT NULL,
                status TINYINT NOT NULL,
                view TINYINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`
            CREATE TABLE directs_categories_department(
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_department CHAR(36) NOT NULL,
                id_direct_category CHAR(36) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`
            CREATE TABLE users_articles_views(
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_user CHAR(36) NOT NULL,
                id_article CHAR(36) NOT NULL,
                id_article_direct_category CHAR(36) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`
            CREATE TABLE articles_reviews(
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_user CHAR(36) NOT NULL,
                id_article CHAR(36) NOT NULL,
                user_public_name VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                rating INT NOT NULL,
                comment TEXT NOT NULL,
                status TINYINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE articles_reviews_options(
                id char(36) NOT NULL PRIMARY KEY,
                id_review char(36) NOT NULL,
                id_option char(36) NOT NULL,
                id_value char(36) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        await connection.execute(`  
            CREATE TABLE articles_reviews_images(
                id char(36) NOT NULL PRIMARY KEY,
                id_review char(36) NOT NULL,
                image VARCHAR(2083) NOT NULL,
                status TINYINT NOT NULL
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE offers(
        //         id char(36) NOT NULL PRIMARY KEY,
        //         name VARCHAR(255) NOT NULL,
        //         description TEXT NOT NULL,
        //         percent_discount DECIMAL(5,2),
        //         image VARCHAR(2083),
        //         date_start DATETIME NOT NULL,
        //         date_end DATETIME NOT NULL,
        //         status TINYINT NOT NULL DEFAULT 1,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     );
        // `);
        await connection.execute(`  
            CREATE TABLE offers(
                id char(36) NOT NULL PRIMARY KEY,
                shop_id char(36),
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                percent_discount DECIMAL(5,2),
                image VARCHAR(2083),
                date_start DATETIME NOT NULL,
                date_end DATETIME NOT NULL,
                status TINYINT NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE offers_categories(
                id char(36) NOT NULL PRIMARY KEY,
                id_offer char(36) NOT NULL,
                id_category char(36) NOT NULL,
                type_category TINYINT NOT NULL,
                percent_discount DECIMAL(5,2),
                status TINYINT NOT NULL DEFAULT 1
            );
        `);

        await connection.execute(`  
            CREATE TABLE offers_articles(
                id char(36) NOT NULL PRIMARY KEY,
                id_offer char(36) NOT NULL,
                id_article char(36) NOT NULL,
                percent_discount DECIMAL(5,2),
                price DECIMAL(10,2),
                status TINYINT NOT NULL DEFAULT 1
            );
        `);

        await connection.execute(`  
            CREATE TABLE users(
                id char(36) NOT NULL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255),
                first_name VARCHAR(255) NOT NULL DEFAULT '',
                last_name VARCHAR(255) NOT NULL DEFAULT '',
                type TINYINT NOT NULL DEFAULT 1,
                user_type_id char(36),
                can_buy TINYINT NOT NULL DEFAULT 1,
                want_use_address TINYINT DEFAULT NULL,
                id_shop_for_cart CHAR(36) DEFAULT NULL,
                id_address_for_cart CHAR(36) DEFAULT NULL,
                id_payment_method_for_cart CHAR(36) DEFAULT NULL,
                id_currency CHAR(36) DEFAULT NULL,
                direction JSON,
                email_verified TINYINT NOT NULL DEFAULT 0,
                google_id VARCHAR(50),
                picture VARCHAR(2083),
                status TINYINT NOT NULL DEFAULT 1,
                shop_id char(36),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // type 1 = admin
        // type 2 = subadmin

        await connection.execute(`
            CREATE TABLE admin_shop(
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_user CHAR(36) NOT NULL,
                email_user VARCHAR(255) NOT NULL,
                id_shop CHAR(36) NOT NULL,
                type TINYINT NOT NULL DEFAULT 1,
                status TINYINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE users_codes_verification(
                id char(36) NOT NULL PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                code VARCHAR(6) NOT NULL,
                expiration_date DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE users_addresses(
        //         id char(36) NOT NULL PRIMARY KEY,
        //         id_user char(36) NOT NULL,
        //         country VARCHAR(255) NOT NULL,
        //         full_name VARCHAR(255) NOT NULL,
        //         number VARCHAR(15) NOT NULL,
        //         address_1 VARCHAR(255) NOT NULL,
        //         address_2 VARCHAR(255),
        //         neighborhood VARCHAR(255) NOT NULL,
        //         province VARCHAR(255) NOT NULL,
        //         postal_code VARCHAR(6),
        //         preferred_address TINYINT NOT NULL DEFAULT 0,
        //         status TINYINT NOT NULL DEFAULT 1,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     );
        // `);

        await connection.execute(`  
            CREATE TABLE users_addresses(
                id char(36) NOT NULL PRIMARY KEY,
                id_user char(36) NOT NULL,
                country_id char(36) NOT NULL,
                province_id char(36) NOT NULL,
                municipality_id char(36) NOT NULL,
                district_id char(36),
                neighborhood_id char(36) NOT NULL,
                street VARCHAR(255) NOT NULL,
                house_number VARCHAR(50),
                address_details VARCHAR(255),
                postal_code VARCHAR(6),
                full_name VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20) NOT NULL,
                latitude DECIMAL(10,8) NOT NULL,
                longitude DECIMAL(11,8) NOT NULL,
                preferred_address TINYINT NOT NULL DEFAULT 0,
                status TINYINT NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                -- Estos campos de aqui ya no son requeridos
                country VARCHAR(255),
                number VARCHAR(15),
                address_1 VARCHAR(255),
                address_2 VARCHAR(255),
                neighborhood VARCHAR(255),
                province VARCHAR(255)
            );
        `);

        await connection.execute(`  
            CREATE TABLE search_history(
                id char(36) NOT NULL PRIMARY KEY,
                id_user char(36) NOT NULL,
                id_article char(36) NOT NULL,
                seeker_phrase varchar(255) not null,
                status TINYINT NOT NULL DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE user_types (
                id CHAR(36) NOT NULL PRIMARY KEY,                  -- UUID del tipo de usuario
                name VARCHAR(100) NOT NULL,                        -- Nombre del tipo (Administrador, Cliente, etc.)
                description VARCHAR(255) NULL,                     -- Descripción opcional
                status TINYINT DEFAULT 1,                       -- 1 = activo, 0 = inactivo
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Fecha de creación
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha de actualización
            );
        `);

        // TODO: ESTA TABLA ES PARA PUBLICAR LAS ORDENES PARA LOS DELIVERIES
        await connection.execute(`  
            CREATE TABLE deliveries_orders (
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_delivery CHAR(36),
                id_cart_bouth CHAR(36) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE countries (
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NULL,
                iso_code VARCHAR(10),
                latitude DECIMAL(10,8) NOT NULL,
                longitude DECIMAL(11,8) NOT NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE provinces (
                id CHAR(36) NOT NULL PRIMARY KEY,
                country_id CHAR(36) NOT NULL,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NULL,
                latitude DECIMAL(10,8) NOT NULL,
                longitude DECIMAL(11,8) NOT NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE municipalities (
                id CHAR(36) NOT NULL PRIMARY KEY,
                province_id CHAR(36) NOT NULL,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NULL,
                latitude DECIMAL(10,8) NULL,
                longitude DECIMAL(11,8) NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE districts (
                id CHAR(36) NOT NULL PRIMARY KEY,
                municipality_id INT NOT NULL,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NULL,
                latitude DECIMAL(10,8) NULL,
                longitude DECIMAL(11,8) NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE neighborhoods (
                id CHAR(36) NOT NULL PRIMARY KEY,
                municipality_id CHAR(36) NOT NULL,
                district_id CHAR(36) NULL,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NULL,
                latitude DECIMAL(10,8) NOT NULL,
                longitude DECIMAL(11,8) NOT NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE offers_articles_options(
        //         id char(36) NOT NULL PRIMARY KEY,
        //         id_offer_article char(36) NOT NULL,
        //         id_option char(36) NOT NULL,
        //         id_value char(36) NOT NULL,
        //         percent_discount DECIMAL(5,2),
        //         price DECIMAL(10,2),
        //         status TINYINT(1) NOT NULL DEFAULT 1
        //     );
        // `);

        await connection.execute(`
           CREATE TABLE user_push_notifications_subscriptions (
                id CHAR(36) NOT NULL PRIMARY KEY,          -- UUID único
                user_id CHAR(36) NULL,                     -- opcional si el usuario tiene cuenta
                endpoint TEXT NOT NULL,                    -- URL del servicio push
                p256dh VARCHAR(255) NOT NULL,              -- clave pública del navegador
                auth VARCHAR(255) NOT NULL,                -- clave auth del navegador
                user_agent VARCHAR(255) NULL,              -- navegador/dispositivo
                status TINYINT(1) NOT NULL DEFAULT 1,      -- 1 = activas, 0 = desactivadas
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE delivery_order_preferences (
                id CHAR(36) NOT NULL PRIMARY KEY,
                id_delivery CHAR(36) NOT NULL,
                delivery_order_id CHAR(36) NOT NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`  
            CREATE TABLE advertisements (
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NULL,
                article_id CHAR(36) NOT NULL,
                link VARCHAR(500) NOT NULL,
                sort_order INT NOT NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE articles_advertisements (
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         advertisement_id CHAR(36) NOT NULL,
        //         article_id CHAR(36) NOT NULL,
        //         link VARCHAR(500) NOT NULL,
        //         sort_order INT NOT NULL,
        //         status TINYINT DEFAULT 1,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        //     );
        // `);

        await connection.execute(`  
            CREATE TABLE home_categories (
                id CHAR(36) NOT NULL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description VARCHAR(255) NULL,
                sort_order INT NOT NULL,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            CREATE TABLE home_category_store (
                id CHAR(36) PRIMARY KEY,
                home_category_id CHAR(36) NOT NULL,
                store_id CHAR(36) NOT NULL,
                top TINYINT DEFAULT 1,
                status TINYINT DEFAULT 1,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (home_category_id) REFERENCES home_categories(id)
            );
        `);

        // await connection.execute(`
        //     CREATE TABLE shops_plans (
        //         id CHAR(36) NOT NULL PRIMARY KEY,
        //         name VARCHAR(100) NOT NULL,
        //         description VARCHAR(255) NULL,
        //         -- sort_order INT NOT NULL,
        //         price DECIMAL(10,2) NOT NULL,
        //         duration_days INT NOT NULL,
        //         commission_rate DECIMAL(5,2) NOT NULL,
        //         status TINYINT DEFAULT 1,
        //         `rank` INT NOT NULL,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        //     );
        // `);

        await connection.execute(`
            CREATE TABLE shops_codes (
                id CHAR(36) NOT NULL PRIMARY KEY,
                shops_plans_id CHAR(36) NOT NULL,
                status TINYINT DEFAULT 1,
                code VARCHAR(100) NOT NULL UNIQUE,
                used_at TIMESTAMP NULL DEFAULT NULL,
                used_by_shop_id CHAR(36) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`
            CREATE TABLE chats (
                id CHAR(36) NOT NULL PRIMARY KEY,
                status TINYINT DEFAULT 1,               
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE chat_participants (
                id CHAR(36) NOT NULL PRIMARY KEY,
                chat_id CHAR(36) NOT NULL,
                user_id CHAR(36) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE chat_messages (
                id CHAR(36) NOT NULL PRIMARY KEY,
                chat_id CHAR(36) NOT NULL,
                sender_id CHAR(36) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await connection.execute(`
            CREATE TABLE periods (
                id CHAR(36) NOT NULL PRIMARY KEY,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                status TINYINT DEFAULT 1, 
                -- status ENUM('open', 'closed') DEFAULT 'open',
                -- Fecha real del cierre contable
                closed_at DATETIME NULL,
                -- Campos opcionales pero muy útiles
                total_gross DECIMAL(10,2) DEFAULT 0,   -- ventas brutas del periodo
                total_commission DECIMAL(10,2) DEFAULT 0, -- comisiones totales
                total_net DECIMAL(10,2) DEFAULT 0, -- lo que se pagará a tiendas (suma de todos los payouts)
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE payouts (
                id CHAR(36) NOT NULL PRIMARY KEY,
                period_id CHAR(36) NOT NULL,
                shop_id CHAR(36) NOT NULL, -- la tienda a la que se le paga
                amount DECIMAL(10,2) NOT NULL,          -- total a pagar a esa tienda
                commission DECIMAL(10,2) DEFAULT 0,     -- si quieres guardar la comisión calculada
                net_amount DECIMAL(10,2) NOT NULL,      -- amount - commission
                paid_at DATETIME DEFAULT CURRENT_TIMESTAMP -- fecha real de pago
            );
            -- CREATE TABLE delivery_payouts (
            --     id INT AUTO_INCREMENT PRIMARY KEY,
            --     period_id INT NOT NULL,
            --     driver_id INT NOT NULL,
            --     orders_count INT DEFAULT 0,
            --     gross_amount DECIMAL(10,2),  -- sum(delivery_cost)
            --     status ENUM('pending','paid') DEFAULT 'pending',
            --     paid_at DATETIME NULL,
            --     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            -- );
        `);

        res.send("Base de datos creada");
    } catch (error) {
        res.send("No se puede crear la bbdd, error: " + error.message);
    }
});

app.delete("/api/delete", async (req, res) => {
    try {
        const connection = await connectToDatabase();
        // await connection.execute("DROP DATABASE francarlos_comunicaciones;");
        await connection.execute("DROP DATABASE byshop_db;");
        res.send("Base de datos eliminada");
    } catch (error) {
        res.send("No se puede eliminar la bbdd");
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
