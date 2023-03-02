import bcrypt from 'bcrypt';
import { createTransport } from 'nodemailer';
import path from 'path';
import Client from 'twilio';
import { fileURLToPath } from 'url';

import * as Boom from '@hapi/boom';

import config from '../config/index.js';
import users from '../presistencia/dao/user/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function twilo(usuario) {
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

async function gmail(asunto, msg) {
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

export async function newUser(req, res, next) {
  try {
    const usuario = {
      nombre: req.body.nombre,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      direccion: req.body.direccion,
      edad: req.body.edad,
      phone: req.body.phone,
      role: 'admin',
      file: req.body.file,
    };

    const resultado = await users.getUsuario(usuario);

    if (resultado === null) {
      usuario.urlImg = `${__dirname}/../file/${usuario.file}`;

      const respuesta=await users.saveUser(usuario);
      console.log(respuesta)
      delete usuario.password;
      res.status(200).redirect("/api/user/login");
    } else {
      res.status(400).redirect("/api/user/login");
      next(Boom.notFound("El usuario ya existe cambia los datos"));
    }
  } catch (err) {
    res.status(400).redirect("/api/user/login");
    next(Boom.notFound("El usuario ya existe cambia los datos"));
  }
}

export async function registrarUsuario(req, res, next) {
  try {
    res.status(200).render("partials/registrar", { acceso: "usuario creado" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.toString() });
  }
}
