// Models
import {
    addressUserPreferred,
    getAddressById,
    getUserAddresses,
    setUserAddressesNotPreferred,
    setUserAddressPreferred,
    updateUserAddress,
} from "../../models/users/usersAddressesModel.js";

export const getUserAddressesController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const userAddresses = await getUserAddresses(idUser);
        if (userAddresses.length > 0) res.json({ data: userAddresses, message: "User Addresses founds" });
        else res.json({ data: [], message: "User Addresses Not founds" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getAddressByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const address = await getAddressById(id);
        if (address) res.json({ data: address[0], message: "Address found" });
        else res.json({ data: {}, message: "Address Not found" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const updateUserAddressController = async (req, res) => {
    try {
        const id = req.params.id;
        const {
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
            status,
            address_details,
            country_id,
            house_number,
            latitude,
            longitude,
            municipality_id,
            neighborhood_id,
            phone_number,
            province_id,
            street,
        } = req.body;
        const userAddress = await updateUserAddress(
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
            status,
            address_details,
            country_id,
            house_number,
            latitude,
            longitude,
            municipality_id,
            neighborhood_id,
            phone_number,
            province_id,
            street
        );
        if (userAddress) res.json({ data: req.body, message: "User Address UpdAted" });
        else res.json({ data: {}, message: "User Address Not updAted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const userAddressCanBePreferredController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const idAddress = req.params.id_address;
        const userAddressesPreferred = await addressUserPreferred(idUser);
        if (userAddressesPreferred.length > 0 || (userAddressesPreferred.id && userAddressesPreferred[0]?.id != idAddress))
            res.json({ data: false, message: "Address Can Not Be Preferred" });
        else res.json({ data: true, message: "Address Can Be Preferred" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const setUserAddressPreferredController = async (req, res) => {
    try {
        const idUser = req.params.id_user;
        const idAddress = req.params.id_address;
        const resUserAddressesNotPreferred = await setUserAddressesNotPreferred(idUser);
        const resUserAddressPreferred = await setUserAddressPreferred(idAddress);
        if (resUserAddressesNotPreferred && resUserAddressPreferred) res.json({ data: true, message: "Address Set Preferred" });
        else res.json({ data: false, message: "Address Not Set Preferred" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
