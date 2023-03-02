import { Router } from 'express';
import multer from 'multer';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  endSession,
  newSession,
  startSession,
} from '../controller/logout.controller.js';
import {
  newUser,
  registrarUsuario,
} from '../controller/user.controller.js';
import { configPassport } from '../middleware/loggin/passport.js';
import { validateUserLogin } from '../middleware/schemas/schema.user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../file` )
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ dest: `${__dirname}/../file`,storage: storage  });
configPassport(passport);

const router = Router();
router.get("/", registrarUsuario);
router.post("/",upload.single('file'), newUser);
router.get("/login", startSession);
router.post(
  "/login",
  validateUserLogin(),
  passport.authenticate("local", {
    failureRedirect: "/api/user/login",
  }),
  newSession
);
router.get("/logout", endSession);

export default router;
