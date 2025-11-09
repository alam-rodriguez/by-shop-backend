import express from "express";
const router = express.Router();
import webpush from "web-push";
import {
    createUserPushNotificationSubscriptionController,
    sendAdminShopsPushNotificationsForNewOrderController,
    sendPushNotificationToClientController,
    sendPushNotificationToDeliveriesController,
    sendUsersPushNotificationSubscriptionsController,
} from "../../controllers/web-push-notification/webPushNotification.js";

let subscriptions = []; // aquí podrías usar una base de datos

// app.get("/public-key", (req, res) => {
//     res.json({ publicKey: vapidKeys.publicKey });

// Guardar suscripciones
router.post("/subscribe", createUserPushNotificationSubscriptionController);

// Enviar notificación
router.post("/send-notification", sendUsersPushNotificationSubscriptionsController);
router.post("/send-notification-for-news-orders/:order_id", sendAdminShopsPushNotificationsForNewOrderController);
router.post("/send-notification-client-update-status-order/:user_id", sendPushNotificationToClientController);
router.post("/send-notification-for-new-order-to-deliveries", sendPushNotificationToDeliveriesController);

export default router;
