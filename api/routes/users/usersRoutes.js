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
    getUsersController,
    getUserShopController,
    
    updateUserController,
    updateUserEmailVerifiedController,
    updateUserWantUseAddressController,
} from "../../controllers/users/usersController.js";
import { getAddressByIdController, getUserAddressesController, setUserAddressPreferredController, updateUserAddressController, userAddressCanBePreferredController } from "../../controllers/users/usersAddressesController.js";

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

// getUserShopController;

export default router;
