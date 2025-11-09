import webpush from "web-push";
import dotenv from "dotenv";
dotenv.config();

// Tus claves VAPID
const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
};

// Configurar web-push
webpush.setVapidDetails("mailto:admin@tudominio.com", vapidKeys.publicKey, vapidKeys.privateKey);
