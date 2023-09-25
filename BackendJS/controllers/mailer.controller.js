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
                `
                <!DOCTYPE html>
                <html>

                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #3F61A6;
                            margin: 0;
                            padding: 0;
                        }

                        .container {
                            background-color: #D3E284;
                            border-radius: 10px;
                            padding: 20px;
                            margin: 20px auto;
                            max-width: 600px;
                            text-align: center;
                        }

                        h1 {
                            color: #592E2E;
                        }

                        p {
                            color: #000000;
                            font-size: 18px;
                            line-height: 1.6;
                            margin-bottom: 10px;
                        }

                        .verification-code {
                            background-color: #F2B199;
                            color: #fff;
                            font-size: 24px;
                            padding: 10px;
                            margin: 20px 0;
                            border-radius: 5px;
                        }

                        .divider {
                            background-color: #592E2E;
                            height: 2px;
                            margin: 20px 0;
                        }

                        .text-justify {
                            text-align: justify;
                        }
                    </style>
                </head>

                <body>
                    <div class="container">
                        <h1>Bienvenid@, ${req.body.name}</h1>
                        <div class="divider"></div>
                        <p>¡Nos complace que nos hayas elegido para tu estadía!</p>
                        <p class="text-justify">Para garantizar tu seguridad y comodidad, hemos generado un código de verificación único:</p>
                        <p class="verification-code"><strong>${req.body.code}</strong></p>
                        <p class="text-justify">Este código es esencial para realizar reservaciones y acceder a nuestros servicios exclusivos. 
                        Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
                        Recuerda que este código de verificación es personal y con él gestionarás cada una de tus reservaciones.</p>
                        <p><strong>¡Esperamos que tengas una estancia inolvidable!</strong></p>
                    </div>
                </body>

                </html>
            `,

        });
        console.log('sended to ' + req.body.email);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

