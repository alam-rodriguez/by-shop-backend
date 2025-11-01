import express from "express";
const router = express.Router();

// Controllers
import {
    changeUserCanBuyController,
    changeUserTypeController,
    createUserAddressController,
    createUserController,
    createUserShopAdminController,
    createUserShopSubadminController,
    getUserByIdController,
    getUserCurrencyOrMainCurrency,
    getUsersController,
    getUserShopController,
    updateUserController,
    updateUserEmailVerifiedController,
    updateUserIdAddressForCartController,
    updateUserIdCurrencyController,
    updateUserIdPayMathodForCartController,
    updateUserIdShopForCartController,
    updateUserTypeIdController,
    updateUserWantUseAddressController,
} from "../../controllers/users/usersController.js";
import {
    getAddressByIdController,
    getUserAddressesController,
    setUserAddressPreferredController,
    updateUserAddressController,
    userAddressCanBePreferredController,
} from "../../controllers/users/usersAddressesController.js";
import { createUserTypeController, getUsersTypesController } from "../../controllers/users/usersTypesController.js";

// Types Users
router.get("/types", getUsersTypesController);
router.post("/types", createUserTypeController);

router.get("/get-user-currency-or-main-currency", getUserCurrencyOrMainCurrency);

router.get("/", getUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);
router.put("/:id", updateUserController);
router.patch("/change-type/:id", changeUserTypeController);
// router.patch("/change-can_buy/:id", changeUserCanBuyController);
router.patch("/change-can-buy/:id", changeUserCanBuyController);

router.post("/addresses", createUserAddressController);
router.put("/addresses/:id", updateUserAddressController);
router.get("/addresses/user/:id_user", getUserAddressesController);
router.get("/addresses/:id", getAddressByIdController);
router.get("/addresses/can-be-preferred/:id_user/:id_address", userAddressCanBePreferredController);
router.patch("/addresses/set-preferred/:id_user/:id_address", setUserAddressPreferredController);

router.put("/change-want-use-address/:id", updateUserWantUseAddressController);
router.put("/change-email_verified/:email", updateUserEmailVerifiedController);
router.put("/change-email-verified/:email", updateUserEmailVerifiedController);

router.post("/set-shop-admin", createUserShopAdminController);
router.post("/set-shop-sub-admin", createUserShopSubadminController);

router.get("/shop-data/:email_user", getUserShopController);

router.patch("/change-id-shop-for-cart/:id_user/:id_shop", updateUserIdShopForCartController);
router.patch("/change-id-pay-method-for-cart/:id_user/:id_pay_method", updateUserIdPayMathodForCartController);
router.patch("/change-id-user-address-for-cart/:id_user/:id_address", updateUserIdAddressForCartController);

router.patch("/change-id-currency-user/:id_user", updateUserIdCurrencyController);
router.patch("/change-user-type-id/:id_user", updateUserTypeIdController);

// getUserShopController;

export default router;
