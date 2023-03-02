import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import db from './connection.js'

db.sync()

const PORT = process.env.PORT

const app = express()

app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))