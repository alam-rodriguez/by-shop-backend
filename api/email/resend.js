import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (subject, html, emails) => {
    const { data, error } = await resend.emails.send({
        from: "noreply@byshop.online",
        to: emails,
        subject: subject,
        html: html,
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
    return true;
};
