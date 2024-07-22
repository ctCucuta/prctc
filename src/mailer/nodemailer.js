const nodemailer = require('nodemailer');                               //Libreria 'nodemailer'
require('dotenv').config();
const { NODEMAILER } = process.env;                                     //Variables de entorno, NODEMAILER es la contraseña generada en Google
// console.log(NODEMAILER)



module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',                                               //Se escribe el servicio de correo
        auth: {
            user: 'notificaciones@ctc.edu.co',                            //Correo de la empresa
            pass: NODEMAILER,                                           //Contraseña del correo
        },
    }),


    mailDetails: (email, name, consecutive) => {                                           //^Mail de bienvenida para el cliente
        const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        return {
            from: 'notificaciones@ctc.edu.co',                            //Correo de la empresa
            to: email,                                                  //Email del usuario
            subject: `¡Bienvenido al centro Técnologico de Cúcuta!`,                  //Asunto del corre
            html: `
            <div style="max-width: 600px; margin: 0 auto; text-align: center; font-family: Arial, sans-serif;">
            <p style="font-size: 14px;">${currentDate}</p>
                   
                    <h1 style="color: #007BFF;">Bienvenido al Centro Tecnológico de Cúcuta</h1>
                    <p style="font-size: 18px;">¡Hola ${name}!</p>
                    <hr>
                    <p style="font-size: 16px;">Tu solicitud será atendida con el Número de radicado: ${consecutive}</p>
                    <hr>
                    <p style="font-size: 12px; text-align: justify; color: #555;">
                        De acuerdo a la Ley 1581 de 2012, sus datos personales están protegidos y no serán compartidos ni utilizados con fines diferentes a los relacionados con este proceso. 
                        Usted puede ejercer sus derechos de acceso, actualización, rectificación, supresión y revocar la autorización suministrada, a través de nuestro canal de atención al cliente.
                    </p>
                    <hr>
                    <p style="font-size: 14px; color: #888;">Este mensaje ha sido enviado desde una dirección de correo electrónico que forma parte de un sistema masivo programado. Por favor, absténgase de responder o enviar una misiva a través de esta dirección electrónica.</p>
                    
                </div>
                
            `
        }

    },
    // mailResponse: (email, name,file) => {
    //     return {
    //         from: 'pruebadesarrollo2184@gmail.com',
    //         to: email,
    //         subject: 'Respuesta PQRS',
    //         html:
    //             `
    //                 <h1>Hola <b>${name},</b></h1>,
                   
                    
    //             `,
    //             attachments: [
    //                 {
    //                   filename: file.filename, 
    //                   path: file.path,
    //                   contentType: 'application/pdf'
    //                 }
    //               ]
    //         ,
    //     }
    // },

}
