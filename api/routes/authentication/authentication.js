import express from "express";

const router = express.Router();

// App
import { app } from "../../index.js";

// Controllers
import {
    genereCodeEmailController,
    getEmailVerificationCodeController,
    getUserInformationController,
    loginUserController,
    logoutController,
    refreshTokenController,
    registerUserController,
    userEmailIsVerifiedController,
    userExistsController,
} from "../../controllers/authentication/authenticationController.js";
import { authUserWithGoogle, googleCallback } from "../../auth/google.js";

router.get("/get-user-info", getUserInformationController);
router.post("/refresh-token", refreshTokenController);

router.get("/user-exists/:email", userExistsController);

router.get("/user-email-verified/:email", userEmailIsVerifiedController);

router.post("/generate-code-email/:email", genereCodeEmailController);

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/code-verification/:email", getEmailVerificationCodeController);

router.post("/logout", logoutController);

// router.post("/logout", fn);
// router.post("/refresh-token", fn);

router.get("/google", authUserWithGoogle);

router.get("/google/callback", googleCallback);

export default router;
