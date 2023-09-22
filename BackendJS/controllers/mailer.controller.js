import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../config.js";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
});

export const sendMail = async (req, res) => {
    try {
        if (!req.body || !req.body.email) {
            return res.status(400).json({ error: "El cuerpo de la solicitud debe contener una propiedad 'email' válida." });
        }
        await transporter.sendMail({
            from: EMAIL,
            to: req.body.email,
            subject: "¡Reservación completada!",
            html:
            `<h1 style="text-align:center;">Bienvenid@, ${req.body.name}</h1>
            <p>Para nosotros es un gusto saber que nos has elegido. El código de verificación y seguridad con el que te puedes comunicar con nosotros es: </p>
            <p style="text-align:center;"><strong>${req.body.code}</strong></p>
            <p>Recuerda que este código de verificación es personal y con el gestionarás cada una de tus reservaciones.</p>`,

        });
        console.log('sended to '+req.body.email);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

