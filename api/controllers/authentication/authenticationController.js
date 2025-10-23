// bcrypt
// import bcrypt from "bcrypt";
import bcrypt from "bcrypt"; // en lugar de 'bcrypt'

import jwt from "jsonwebtoken";
import { sendEmail } from "../../email/resend.js";

// Models
import {
    createEmailVerificationCode,
    createUser,
    emailHasVerificationCode,
    getEmailVerificationCode,
    getUser,
    getUserInformation,
    userEmailIsVerified,
    userExists,
} from "../../models/authentication/authenticationModel.js";
import { verificationCodeEmail } from "./verificationCode.js";

export const userExistsController = async (req, res) => {
    try {
        const email = req.params.email;
        const emailUserExists = await userExists(email);
        if (emailUserExists) return res.status(200).json({ exist: true, message: "User exists" });
        return res.status(200).json({ exist: false, message: "User does not exists" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const userEmailIsVerifiedController = async (req, res) => {
    try {
        const email = req.params.email;
        const emailIsVerified = await userEmailIsVerified(email);
        if (emailIsVerified) return res.status(200).json({ isVerified: true, message: "User email is verified" });
        return res.status(200).json({ isVerified: false, message: "User email is not verified" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const genereCodeEmailController = async (req, res) => {
    try {
        const email = req.params.email;

        const emailHasVerificationCodeActive = await emailHasVerificationCode(email);

        if (emailHasVerificationCodeActive) return res.json({ data: req.body, codeWasGenerated: true, message: "Code Email Was Created" });

        const { id: idVerificationCode, email: emailOfCodeValidation, code, expiration_date } = verificationCodeEmail(email);

        const resStatusCode = await createEmailVerificationCode(idVerificationCode, email, code, expiration_date);

        if (resStatusCode) res.json({ data: req.body, codeWasGenerated: true, message: "Code Email Created" });
        else res.json({ data: req.body, codeWasGenerated: false, message: "Code Email Not Created" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const registerUserController = async (req, res) => {
    try {
        console.log(req.body);
        const { id, email, password, first_name, last_name, type, can_buy, direction } = req.body;
        const emailUserExists = await userExists(email);
        console.log("Existe usuario con ese email?");
        console.log(emailUserExists);
        if (emailUserExists) return res.status(400).json({ message: "User already exists" });

        console.log("Contraseña hasheada 1");

        // console.log("password");
        // console.log(password);

        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(password, 10);

        // try {
        //     console.log("✅ Contraseña hasheada:", hashedPassword);

        //     // Aquí podrías guardar el usuario en la BD
        //     // await connection.query(...)

        //     return res.status(201).json({ message: "Usuario registrado con éxito" });
        // } catch (error) {
        //     console.error("❌ Error al hashear la contraseña:", error.message);
        //     return res.status(500).json({ error: "Error interno al hashear la contraseña" });
        // }

        console.log("Contraseña hasheada 2");
        console.log(hashedPassword);

        const user = await createUser(id, email, hashedPassword, first_name, last_name, type, can_buy, direction);

        const token = jwt.sign({ id, email }, "secret", { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id, email }, "secret_refresh", { expiresIn: "30d" });

        console.log("Creando codigo de verificacion");

        const { id: idVerificationCode, email: emailOfCodeValidation, code, expiration_date } = verificationCodeEmail(email);

        console.log("Codigo de verificacion creado");

        console.log(idVerificationCode);
        console.log(emailOfCodeValidation);
        console.log(code);
        console.log(expiration_date);

        const resStatusCode = await createEmailVerificationCode(idVerificationCode, email, code, expiration_date);
        console.log(resStatusCode);

        const resEmail = await sendEmail("subject", `<p>Codigo: ${code}</p>`, [email.toLowerCase()]);
        // console.log(resEmail);

        if (user)
            res.status(201)
                .cookie("access_token", token, { httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 })
                .cookie("refresh_token", refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 30 })
                .json({
                    data: req.body,
                    message: "User Created",
                    token: token,
                    condigoVerificacion: code,
                    envioEmail: resEmail == true ? true : false,
                    // envioEmail: true,
                });
        else res.json({ data: req.body, message: "User Not Created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message, data: "hola" });
    }
};

export const loginUserController = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const emailUserExists = await userExists(email);
        if (!emailUserExists) return res.status(400).json({ message: "User Does Not Exists" });
        const user = await getUser(email);

        // const hashedPassword = await bcrypt.hash(password, 10);

        console.log(password);
        console.log(user.password);

        const isValid = await bcrypt.compare(password, user.password);
        console.log(isValid);
        if (!isValid) return res.status(401).json({ message: "Contraseña Incorrecta", passwordIsValid: false });
        const token = jwt.sign({ id: user.id, email: user.email }, "secret", { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, "secret_refresh", { expiresIn: "30d" });

        res.cookie("access_token", token, { httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 })
            .cookie("refresh_token", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 30,
            })
            .json({
                data: req.body,
                passwordIsValid: true,
                message: "User Logged In",
                token: token,
                // condigoVerificacion: condigoVerificacion,
                // envioEmail: resEmail == true ? true : false,
            });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getEmailVerificationCodeController = async (req, res) => {
    console.log("first");
    try {
        const email = req.params.email;
        console.log(email);
        const emailVerificationCode = await getEmailVerificationCode(email);
        console.log("-----------------");
        console.log(emailVerificationCode);
        console.log("-----------------");

        if (emailVerificationCode.length == 0) return res.status(200).json({ hasCode: false, code: "" });
        return res.status(200).json({ hasCode: true, code: emailVerificationCode[0].code });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getUserInformationController = async (req, res) => {
    console.log("buscar data");
    try {
        const id = req.session.id;
        console.log(id);
        const userInformation = await getUserInformation(id);
        if (userInformation.length == 0) return res.status(204).json({ data: {}, message: "user Information Not Found" });

        return res.status(200).json({ data: userInformation[0], message: "User Information" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const refreshTokenController = async (req, res) => {
    try {
        let refreshToken = req.cookies.refresh_token;
        if (!refreshToken) return res.status(200).json({ message: "No hay refresh token" });

        const refreshTokenData = jwt.decode(refreshToken);

        const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
        const exp = refreshTokenData.exp; // tiempo de expiración del token
        const secondsLeft = exp - now;
        const daysLeft = Math.floor(secondsLeft / (60 * 60 * 24));

        if (daysLeft <= 3) {
            const newRefreshToken = jwt.sign({ id: refreshTokenData.id, email: refreshTokenData.email }, "secret_refresh", { expiresIn: "30d" });
            return res
                .status(201)
                .cookie("refresh_token", newRefreshToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                })
                .json({ message: "Refresh Token Actualizado" });
        }
        res.status(200).json({ message: "No es necesario el refresh token" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const logoutController = (req, res) => {
    try {
        req.session = { id: null, email: null };
        res.clearCookie("access_token", { httpOnly: true, sameSite: "strict" });
        res.clearCookie("refresh_token", { httpOnly: true, sameSite: "strict" });

        return res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión", error: error.message });
    }
};
