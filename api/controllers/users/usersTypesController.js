import { createUserType, getUsersTypes } from "../../models/users/typesUsersModel.js";

export const getUsersTypesController = async (req, res) => {
    try {
        const usersTypes = await getUsersTypes();
        if (usersTypes.length > 0) res.json({ data: usersTypes, message: "Users Types founds" });
        else res.json({ data: [], message: "Users Types Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createUserTypeController = async (req, res) => {
    try {
        const { id, name, description, status } = req.body;
        const result = await createUserType(id, name, description, status);
        if (result) res.status(201).json({ data: req.body, message: "Users Types Created" });
        else res.json({ data: req.body, message: "Users Types Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
