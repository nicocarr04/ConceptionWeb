import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';
import fs from 'fs'
import https from 'https'
import path from 'path'
import database from './connection.js'

import notesRoutes from './routes/notesRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

import notreStrategy from './auth/strategies.js'


import redirectToHttps from './certificats/redirectHTTPS.js'


database.sync()

const PORT = process.env.PORT

const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(redirectToHttps)
passport.use(notreStrategy)

app.use('/notes',notesRoutes)
app.use('/users',usersRoutes)

const certificatOptions = {
    key: fs.readFileSync(path.resolve('./certificats/localhost.key')),
    cert: fs.readFileSync(path.resolve('./certificats/localhost.crt')),
}


const server = https.createServer(certificatOptions, app)

app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))
