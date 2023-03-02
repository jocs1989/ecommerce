import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import managerSessionRedis from './config/sessionRedis.js';
import {
  boomErrorHnadler,
  errorHnadler,
  logError,
} from './middleware/error/handler.error.js';
import { managerCors } from './middleware/security/security.cors.js';
import apiRouter from './routes/index.js';
import managerViews from './views/config.js';

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
const app = express()

app.use('/static', express.static(__dirname + '/static')) // agrega metodos estaticos
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cors
managerCors(app)
//hemlet
//managerHemlet(app)

// session
managerSessionRedis(app)

// views
managerViews(app)
// manager routes
apiRouter(app)
//manager error
app.use(logError )
app.use(boomErrorHnadler)
app.use(errorHnadler)
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`)
})
