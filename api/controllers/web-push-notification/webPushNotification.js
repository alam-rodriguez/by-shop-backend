import { v4 as uuid } from "uuid";

import webpush from "web-push";

import {
    createUserPushNotificationSubscription,
    getClientSubscriptions,
    getUsersDeliveriesSubscriptions,
    getUsersPushNotificationSubscriptions,
    getUsersSubAdminAndAdminShopsSubscriptions,
    getUsersSupportAndDevSubscriptions,
    userDeviceHasPushNotificationSubscription,
} from "../../models/web-push-notification/webPushNotification.js";

export const createUserPushNotificationSubscriptionController = async (req, res) => {
    try {
        const subscription = req.body;
        const userId = req.session.id;

        if (!userId) return res.json({ data: {}, message: "User Is Logout" });

        const id = uuid();
        const endpoint = subscription.endpoint;
        const p256dh = subscription.keys.p256dh;
        const auth = subscription.keys.auth;
        const user_agent = null;
        const status = 1;

        const deviceHasSubscription = await userDeviceHasPushNotificationSubscription(userId, endpoint, p256dh, auth);
        if (deviceHasSubscription) return res.json({ data: {}, message: "This User Device Has Subscription" });

        const result = await createUserPushNotificationSubscription(id, userId, endpoint, p256dh, auth, user_agent, status);
        if (result) res.status(201).json({ data: req.body, message: "User Push Notification Subscription Created" });
        else res.json({ data: req.body, message: "User Push Notification Subscription Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const sendUsersPushNotificationSubscriptionsController = async (req, res) => {
    try {
        const supportAndDevSubscriptions = await getUsersSupportAndDevSubscriptions();

        const sendPromises = supportAndDevSubscriptions.map((sub) => webpush.sendNotification(sub, payload).catch((err) => console.error(err)));

        // const notificationsSubscription = await getUsersPushNotificationSubscriptions();

        if (supportAndDevSubscriptions.length > 0) {
            const { title, body } = req.body;

            const payload = JSON.stringify({
                title,
                body,
            });

            // const subscriptions = notificationsSubscription.map((sub) => ({
            //     endpoint: sub.endpoint,
            //     keys: {
            //         p256dh: sub.p256dh,
            //         auth: sub.auth,
            //     },
            // }));

            const sendPromises = supportAndDevSubscriptions.map((sub) => webpush.sendNotification(sub, payload).catch((err) => console.error(err)));

            await Promise.all(sendPromises);
            res.status(200).json({ message: "Notificaciones enviadas" });
        } else res.json({ data: [], message: "Users Push Notifications Subscriptions Not Founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const sendAdminShopsPushNotificationsForNewOrderController = async (req, res) => {
    try {
        const idCartBought = req.params.order_id;

        const usersSupportAndDevSubscriptions = await getUsersSupportAndDevSubscriptions();
        const usersSubAdminAndAdminShopsSubscription = await getUsersSubAdminAndAdminShopsSubscriptions(idCartBought);

        const { title, body } = req.body;

        const payload = JSON.stringify({
            title: "Nuevo Pedido",
            body: "Nuevo Pedido",
        });

        if (usersSupportAndDevSubscriptions.length > 0) {
            const sendPromises = usersSupportAndDevSubscriptions.map((sub) =>
                webpush.sendNotification(sub, payload).catch((err) => console.error(err))
            );

            await Promise.all(sendPromises);
        }
        if (usersSubAdminAndAdminShopsSubscription.length > 0) {
            const sendPromises = usersSubAdminAndAdminShopsSubscription.map((sub) =>
                webpush.sendNotification(sub, payload).catch((err) => console.error(err))
            );
            await Promise.all(sendPromises);
        }
        if (usersSupportAndDevSubscriptions.length > 0 || usersSubAdminAndAdminShopsSubscription.length > 0) {
            return res.status(200).json({ message: "Notificaciones enviadas" });
        } else return res.json({ data: [], message: "Users Push Notifications Subscriptions Not Founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const sendPushNotificationToClientController = async (req, res) => {
    console.log("----------------------------|||||-------------------------------------");

    try {
        const userId = req.params.user_id;
        console.log(userId);
        console.log("User Id");

        const userClientSubscriptions = await getClientSubscriptions(userId);

        console.log(userClientSubscriptions);

        const { title, body } = req.body;

        const payload = JSON.stringify({
            title,
            body,
        });

        if (userClientSubscriptions.length > 0) {
            const sendPromises = userClientSubscriptions.map((sub) => webpush.sendNotification(sub, payload).catch((err) => console.error(err)));

            await Promise.all(sendPromises);
            return res.status(201).json({ data: [], message: "Notificaciones enviadas" });
        } else return res.json({ data: [], message: "Users Push Notifications Subscriptions Not Founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const sendPushNotificationToDeliveriesController = async (req, res) => {
    try {
        const usersDeliveriesSubscriptions = await getUsersDeliveriesSubscriptions();

        console.log(usersDeliveriesSubscriptions);
        console.log("usersDeliveriesSubscriptions");

        const { title, body } = req.body;

        const payload = JSON.stringify({
            title: title ?? "Hay un nuevo delivery",
            body: body ?? "Hay un nuevo delivery, adelantate a los demas",
        });

        if (usersDeliveriesSubscriptions.length > 0) {
            const sendPromises = usersDeliveriesSubscriptions.map((sub) => webpush.sendNotification(sub, payload).catch((err) => console.error(err)));

            await Promise.all(sendPromises);
            return res.status(201).json({ data: [], message: "Notificaciones enviadas" });
        } else return res.json({ data: [], message: "Users Push Notifications Subscriptions Not Founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
