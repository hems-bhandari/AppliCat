import nodemailer from "nodemailer";

const EMAIL = process.env.NODEMAILER_EMAIL;
const PASSWORD = process.env.NODEMAILER_PASSWORD;
const EMAIL_HOST = process.env.NODEMAILER_EMAIL_HOST;
const EMAIL_FROM = process.env.NODEMAILER_EMAIL_FROM;
const EMAIL_SENDER = process.env.NODEMAILER_EMAIL_SENDER;

export const sendMail = async (to: string, subject: string, message: string) => {
    if (!EMAIL || !PASSWORD || !EMAIL_HOST || !EMAIL_SENDER || !EMAIL_FROM)
        throw new Error("Invalid nodemailer configuration cannot send mail. \n Please check you environment variables");

    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 465,
        secure: true, // use SSL
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },
    });

    const options = {
        from: `"${EMAIL_SENDER}" <${EMAIL_FROM}>`,
        to,
        subject,
        text: message,
    };

    transporter.sendMail(
        options,
        (err: Error | null, info: nodemailer.SentMessageInfo) => {
            if (err) console.log(err);
            else console.log(info);
        }
    );
};

