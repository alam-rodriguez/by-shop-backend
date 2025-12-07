import connection from "../../connection.js";

export const existsChat = async (id) => {
    const [rows] = await connection.execute("SELECT id FROM chats WHERE id = ?", [id]);
    return rows.length > 0;
};

export const getChatIdByUsers = async (senderId, receiverId) => {
    const [rows] = await connection.execute(
        `
          SELECT 
            c.id
          FROM chats c
          WHERE c.id = (
              SELECT cp.chat_id
              FROM chat_participants cp
              WHERE cp.user_id IN (?, ?)
              GROUP BY cp.chat_id
              HAVING COUNT(DISTINCT cp.user_id) = 2
          );
      `,
        [senderId, receiverId]
    );
    return rows;
};

export const createChat = async (id) => {
    const [rows] = await connection.execute("INSERT INTO chats(id) VALUES(?)", [id]);
    return rows.affectedRows > 0;
};

export const existsChatParticipant = async (chatId, userId) => {
    const [rows] = await connection.execute("SELECT id FROM chat_participants WHERE chat_id = ? AND user_id = ?", [chatId, userId]);
    return rows.length > 0;
};

export const createChatParticipant = async (id, chat_id, user_id) => {
    const [rows] = await connection.execute("INSERT INTO chat_participants(id, chat_id, user_id) VALUES(?, ?, ?)", [id, chat_id, user_id]);
    return rows.affectedRows > 0;
};

export const createChatMessage = async (id, chat_id, sender_id, message) => {
    const [rows] = await connection.execute("INSERT INTO chat_messages(id, chat_id, sender_id, message) VALUES(?, ?, ?, ?)", [
        id,
        chat_id,
        sender_id,
        message,
    ]);
    return rows.affectedRows > 0;
};

export const getChatMessages = async (chatId) => {
    const [rows] = await connection.execute(
        `
        SELECT 
          *, 
          DATE_FORMAT(created_at, '%H:%i') AS hour 
        FROM chat_messages WHERE chat_id = ?
        ORDER BY created_at ASC
      `,
        [chatId]
    );
    return rows;
};

export const getChatsByUser = async (userId) => {
    const [rows] = await connection.execute(
        `
          SELECT 
            c.id AS chat_id,
            CONCAT_WS(' ', u.first_name, u.last_name) AS other_user_name,
            u.id AS other_user_id,
            u.picture AS other_user_picture
          FROM chat_participants cp
          INNER JOIN chat_participants cp2 
              ON cp.chat_id = cp2.chat_id AND cp2.user_id != ?
          INNER JOIN chats c 
              ON c.id = cp.chat_id
          INNER JOIN users u 
              ON u.id = cp2.user_id
          WHERE cp.user_id = ?;
    `,
        [userId, userId]
    );
    return rows;
};

// export const getCurrencies = async () => {
//     const [rows] = await connection.execute("SELECT * FROM currencies");
//     return rows;
// };
