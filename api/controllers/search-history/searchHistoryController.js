import { createSearchHistory, getSearchHistoryByIdUser, updateSearchHistoryStatus } from "../../models/search_history/searchHistotyModels.js";

export const createSearchHistoryController = async (req, res) => {
    try {
        const { id, id_user, id_article, seeker_phrase } = req.body;
        const result = await createSearchHistory(id, id_user, id_article, seeker_phrase);
        if (result) res.status(201).json({ data: req.body, message: "Search History Created" });
        else res.json({ data: req.body, message: "Search History Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getSearchHistoryByIdUserController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const result = await getSearchHistoryByIdUser(idUser);
        if (result.length > 0) res.json({ data: result, message: "Search History User Found" });
        else res.json({ data: [], message: "Search History User Not Found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateSearchHistoryStatusController = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const result = await updateSearchHistoryStatus(id, status);
        if (result) res.json({ data: req.body, message: "Status Search History Updated" });
        else res.json({ data: req.body, message: "Status Search History Not Updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
