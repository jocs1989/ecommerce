import { createTransport } from 'nodemailer';
import Client from 'twilio';

export async function twilo(usuario) {
    const accountSid = config.TWILIO.TWILIO_ACCOUNT_SID;
    const authToken = config.TWILIO.TWILIO_AUTH_TOKEN;
    const numberPhone = config.TWILIO.TWILIO_PHONE_NUMBER;
    const client = Client(accountSid, authToken);
    client.messages
      .create({
        from: `whatsapp:${numberPhone}`,
        body: `Solicito acceso el usuario :${usuario}`,
        to: "whatsapp:+52555555555",
      })
      .then((message) => {
        console.log("Mensaje enviado");
        console.log(message.sid);
      });
  }
  
  
export async function gmail(email,asunto, msg) {
    try {
      const options = {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: config.GMAIL.MAIL,
          pass: config.GMAIL.PASSWORD,
        },
      };
      const trasporter = createTransport(options);
      const mailOptions = {
        from: config.GMAIL.MAIL,
        to: config.GMAIL.MAIL,
        subject: asunto,
        html: msg,
      };
      const info = await trasporter.sendMail(mailOptions);
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  }
  