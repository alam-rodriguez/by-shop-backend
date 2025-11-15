import querystring from "querystring";
import jwt from "jsonwebtoken";
import axios from "axios";
import { createUser, createUserFromGoogle, updateUserGoogleId } from "../models/users/usersModel.js";
import { getUser, userExists, userHasGoogleId } from "../models/authentication/authenticationModel.js";

import { v4 as uuidv4 } from "uuid";

export const authUserWithGoogle = async (req, res) => {
    const params = querystring.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
    });

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

export const googleCallback = async (req, res) => {
    const code = req.query.code;

    try {
        const postData = querystring.stringify({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
        });

        const { data } = await axios.post("https://oauth2.googleapis.com/token", postData, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const accessToken = data.access_token;
        const idToken = data.id_token;

        // Obtener info del usuario
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { Authorization: `Bearer ${accessToken}` } });

        const { sub: googleId, email, name, picture, given_name, family_name, email_verified } = userInfo.data;

        // {
        //     sub: '102050802924445887686',
        //     name: 'Alam Rodriguez',
        //     given_name: 'Alam',
        //     family_name: 'Rodriguez',
        //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocI8OmTxP7bD7yQlaUsjwt0bxIOuyp2ulBgztPCrPvuWFXaB6kA=s96-c',
        //     email: 'alamrd2016@gmail.com',
        //     email_verified: true
        // }

        console.log("---------------------");
        console.log(userInfo.data);
        console.log("---------------------");

        // return;

        // const token = jwt.sign({ name, email, picture, googleId }, "secret", { expiresIn: "1h" });

        let idUser;

        // TODO: TENGO QUE ACTUALIZAR LA TABLA USERS

        const emailUserExists = await userExists(email);
        if (emailUserExists) {
            const dataUser = await getUser(email);
            console.log(dataUser);
            console.log("--------------------------||||||||||||||||||||||||||||||----------------------------");
            idUser = dataUser.id;
        } else idUser = uuidv4();

        const token = jwt.sign({ id: idUser, email }, "secret", { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: idUser, email }, "secret_refresh", { expiresIn: "30d" });

        // TODO:  sino existe
        if (!emailUserExists) {
            const user = await createUserFromGoogle(idUser, given_name, family_name, 1, 1, email, googleId, picture, email_verified ? 1 : 0);
            console.log(user);
            console.log("Nuevo usuario guardado en base de datos");
        }
        if (emailUserExists) {
            const hasGoogleId = await userHasGoogleId(email, googleId);
            if (!hasGoogleId) {
                const resUpdate = await updateUserGoogleId(email, googleId);
                console.log(resUpdate);
                console.log("GoogleId de usuario cambiado");
            }
        }

        // res.status(201)
        //     .cookie("access_token", token, { httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 })
        //     .cookie("refresh_token", refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 30 })
        //     .json({
        //         data: req.body,
        //         message: "User Created",
        //         token: token,
        //         // condigoVerificacion: code,
        //         // envioEmail: resEmail == true ? true : false,
        //         // envioEmail: true,
        //     });

        // res.redirect(`http://localhost:3000//usuario/sesion?token=${token}`);
        // 6️⃣ Guardamos cookies
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60,
        });
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        // return res.redirect(`http://localhost:3000/usuario/sesion?login=success`);
        return res.redirect(`${process.env.FRONTEND_URL}/usuario/sesion?login=success`);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).send("Error autenticando con Google");
    }
};
