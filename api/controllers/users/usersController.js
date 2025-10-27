import { getCurrenciesById, getMainCurrency } from "../../models/currencies/currenciesModel.js";
import {
    changeUserCanBuy,
    changeUserType,
    createUser,
    createUserAddress,
    createUserShopAdmin,
    getUserById,
    getUsers,
    getUserShop,
    shopHasAdmin,
    updateUser,
    updateUserEmailVerified,
    updateUserIdAddressForCart,
    updateUserIdCurrency,
    updateUserIdPayMathodForCart,
    updateUserIdShopForCart,
    updateUserWantUseAddress,
} from "../../models/users/usersModel.js";

export const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        if (users.length > 0) res.json({ data: users, message: "Users founds" });
        else res.json({ data: [], message: "Users Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (user) res.json({ data: user, message: "User found" });
        else res.json({ data: [], message: "User Not found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const createUserController = async (req, res) => {
    try {
        const { id, first_names, last_names, registration_date, type, can_buy, email, password, direction } = req.body;
        const user = await createUser(id, first_names, last_names, registration_date, type, can_buy, email, password, direction);
        if (user == 1) res.status(201).json({ data: req.body, message: "User Created" });
        else res.json({ data: req.body, message: "User Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const id = req.params.id;
        const { first_names, last_names, type, can_buy, email, password, direction } = req.body;
        const user = await updateUser(first_names, last_names, type, can_buy, email, password, direction, id);
        if (user) res.json({ data: req.body, message: "User Updated" });
        else res.json({ data: req.body, message: "User Not Update" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const changeUserTypeController = async (req, res) => {
    try {
        const id = req.params.id;
        const type = req.body.type;
        const user = await changeUserType(id, type);
        if (user) res.json({ data: type, message: "User Type Changed" });
        else res.json({ data: false, message: "User Type Not Changed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const changeUserCanBuyController = async (req, res) => {
    try {
        const id = req.params.id;
        const canBuy = req.body.can_buy;
        const user = await changeUserCanBuy(id, canBuy);
        if (user) res.json({ data: canBuy, message: "User can_buy Changed" });
        else res.status(400).json({ data: false, message: "User can_buy Not Changed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createUserAddressController = async (req, res) => {
    try {
        const { id, id_user, country, full_name, number, address_1, address_2, neighborhood, province, postal_code, preferred_address, status } =
            req.body;
        const userAddress = await createUserAddress(
            id,
            id_user,
            country,
            full_name,
            number,
            address_1,
            address_2,
            neighborhood,
            province,
            postal_code,
            preferred_address,
            status
        );
        if (userAddress) res.status(201).json({ data: req.body, message: "User Address Created" });
        else res.json({ data: {}, message: "User Address Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// export const updateUserAddressController = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { id_user, country, full_name, number, address_1, address_2, neighborhood, province, postal_code, preferred_address, status } =
//             req.body;
//         const userAddress = await updateUserAddress(
//             id,
//             id_user,
//             country,
//             full_name,
//             number,
//             address_1,
//             address_2,
//             neighborhood,
//             province,
//             postal_code,
//             preferred_address,
//             status
//         );
//         if (userAddress) res.json({ data: req.body, message: "User Address UpdAted" });
//         else res.json({ data: {}, message: "User Address Not updAted" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

export const updateUserWantUseAddressController = async (req, res) => {
    try {
        const id = req.params.id;
        const { want_use_address } = req.body;
        const user = await updateUserWantUseAddress(id, want_use_address);
        if (user) res.json({ data: req.body, message: "User Want Use Address Updated" });
        else res.status(404).json({ data: {}, message: "User Want Use Address Not Updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserEmailVerifiedController = async (req, res) => {
    try {
        const email = req.params.email;
        const { email_verified } = req.body;
        const user = await updateUserEmailVerified(email, email_verified);
        if (user) res.json({ data: req.body, message: "User Email Verified Updated" });
        else res.status(404).json({ data: {}, message: "User Email Verified Not Updated" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createUserShopAdminController = async (req, res) => {
    try {
        const { id, id_user, email_user, id_shop, type, status } = req.body;
        const shopHasAdmin2 = await shopHasAdmin(id_shop);
        if (shopHasAdmin2) return res.status(400).json({ data: {}, message: "Esta tienda ya tiene un admin asignado." });
        const user = await createUserShopAdmin(id, id_user, email_user, id_shop, type, status);
        if (user) res.json({ data: req.body, message: "User Admin Created" });
        else res.status(404).json({ data: {}, message: "User Admin Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const createUserShopSubadminController = async (req, res) => {
    try {
        const { id, email_user, id_shop, type, status } = req.body;
        // const shopHasAdmin2 = await shopHasAdmin(id_shop);
        // if (shopHasAdmin2) return res.status(400).json({ data: {}, message: "Esta tienda ya tiene un admin asignado." });
        const user = await createUserShopAdmin(id, email_user, id_shop, type, status);
        if (user) res.json({ data: req.body, message: "User SubAdmin Created" });
        else res.status(400).json({ data: {}, message: "User SubAdmin Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getUserShopController = async (req, res) => {
    try {
        const emailUser = req.params.email_user;
        const userShop = await getUserShop(emailUser);
        if (userShop.length > 0) res.json({ data: userShop[0], message: "User Shop found" });
        else res.json({ data: {}, message: "User Shop Not found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserIdShopForCartController = async (req, res) => {
    try {
        const { id_user, id_shop } = req.params;
        const result = await updateUserIdShopForCart(id_user, id_shop);
        if (result) res.json({ data: req.body, message: "user shop for cart was changed" });
        else res.json({ data: req.body, message: "user shop for cart was not changed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserIdPayMathodForCartController = async (req, res) => {
    try {
        const { id_user, id_pay_method } = req.params;
        const result = await updateUserIdPayMathodForCart(id_user, id_pay_method);
        if (result) res.json({ data: req.body, message: "user pay method for cart was changed" });
        else res.json({ data: req.body, message: "user pay method for cart was not changed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserIdAddressForCartController = async (req, res) => {
    try {
        const { id_user, id_address } = req.params;
        const result = await updateUserIdAddressForCart(id_user, id_address);
        if (result) res.json({ data: req.body, message: "user address for cart was changed" });
        else res.json({ data: req.body, message: "user address for cart was not changed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserIdCurrencyController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const idCurrency = req.body.id_currency;
        const result = await updateUserIdCurrency(idUser, idCurrency);
        if (result) res.json({ data: req.body, message: "user currency was changed" });
        else res.json({ data: req.body, message: "user currency was not changed" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getUserCurrencyOrMainCurrency = async (req, res) => {
    console.log("--------------------------------------------");
    console.log("--------------------------------------------");
    console.log("--------------------------------------------");
    console.log("--------------------------------------------");

    try {
        const idUser = req.session.id;
        const dataUser = await getUserById(idUser);

        let currency;

        console.log(dataUser.id_currency);
        console.log("--------------------------------------------");

        if (dataUser.id_currency) currency = (await getCurrenciesById(dataUser.id_currency))[0];
        else currency = (await getMainCurrency())[0];

        res.json({ data: currency, message: "user currency found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
