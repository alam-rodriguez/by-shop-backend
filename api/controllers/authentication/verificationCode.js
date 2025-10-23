import { v4 as uuid } from "uuid";

function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const verificationCodeEmail = (email) => {
    const expiration_date = new Date();
    expiration_date.setMinutes(expiration_date.getMinutes() + 5);

    return {
        id: uuid(),
        email,
        code: generateVerificationCode(),
        expiration_date,
    };
};
