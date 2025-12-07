// Express
import express from "express";
const router = express.Router();

// Controllers
import {
    createChatController,
    createChatMessageController,
    createChatParticipantController,
    getChatIdByUsersController,
    getChatMessagesController,
    getChatsByUserController,
} from "../../controllers/chats/chatsControllers.js";

// router.get("/", getCurrenciesController);
// router.get("/for-customers", getCurrenciesForCustomersController);
// router.get("/can-be-main-currency/:id", canMakeCurrencyMainCurrencyController);
// router.get("/:id", getCurrenciesByIdController);
router.post("/", createChatController);
router.post("/participants", createChatParticipantController);
router.post("/message", createChatMessageController);
router.get("/:chat_id", getChatMessagesController);
router.get("/get-id/:sender_id/:receiver_id", getChatIdByUsersController);
router.get("/user/:user_id", getChatsByUserController);

// router.put("/:id", updateCurrencyController);

export default router;
