import { v4 as uuid } from "uuid";

import {
    createChat,
    createChatMessage,
    createChatParticipant,
    existsChat,
    existsChatParticipant,
    getChatIdByUsers,
    getChatMessages,
    getChatOtherparticipantInfo,
    getChatsByUser,
} from "../../models/chats/chatsModels.js";

export const createChatController = async (req, res) => {
    try {
        const id = req.body.id;
        const exists = await existsChat(id);
        if (exists) return res.json({ message: "This Chat Exists", data: null });
        const response = await createChat(id);
        return res.status(response ? 201 : 200).json({ message: response ? "Chat Created" : "Chat Not Created", data: null });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createChatParticipantController = async (req, res) => {
    try {
        const { chat_id, user_id } = req.body;
        const exists = await existsChatParticipant(chat_id, user_id);
        if (exists) return res.json({ message: "This Chat participant Exists", data: null });
        const response = await createChatParticipant(uuid(), chat_id, user_id);
        return res.status(response ? 201 : 200).json({ message: response ? "Chat Created" : "Chat Not Created", data: null });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createChatMessageController = async (req, res) => {
    try {
        const { id, chat_id, sender_id, message } = req.body;
        const response = await createChatMessage(id, chat_id, sender_id, message);
        return res.status(response ? 201 : 200).json({ message: response ? "Chat Message Created" : "Chat Message Not Created", data: req.body });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getChatMessagesController = async (req, res) => {
    try {
        // const { chatId } = req.params.chat_id;
        const { chat_id } = req.params;
        const chats = await getChatMessages(chat_id);
        return res.json({ message: chats.length > 0 ? "Chat Messages Founds" : "Chat Messages Not Founds", data: chats });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getChatIdByUsersController = async (req, res) => {
    try {
        const { sender_id, receiver_id } = req.params;
        const chat = await getChatIdByUsers(sender_id, receiver_id);
        return res.json({ message: chat.length > 0 ? "Chat Found" : "Chat Not Found", data: null, chatId: chat.length > 0 ? chat[0].id : null });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getChatsByUserController = async (req, res) => {
    try {
        const userId = req.params.user_id;
        const chats = await getChatsByUser(userId);
        return res.json({
            message: chats.length > 0 ? "Chats Founds" : "Chats Not Founds",
            data: chats,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getChatOtherparticipantInfoController = async (req, res) => {
    try {
        const OtherparticipantId = req.params.id;
        const OtherparticipantInfo = await getChatOtherparticipantInfo(OtherparticipantId);
        return res.json({
            message: OtherparticipantInfo.length > 0 ? "Chat Other Participant Info Found" : "Chat Other Participant Info Not Found",
            data: OtherparticipantInfo[0],
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
