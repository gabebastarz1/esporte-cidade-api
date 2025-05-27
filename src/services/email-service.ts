import env from "../environment/env";
import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: env.APP_EMAIL,
                pass: env.APP_EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: env.APP_EMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};