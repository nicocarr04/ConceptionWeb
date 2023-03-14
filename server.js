import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import passport from 'passport';

import database from './connection.js'

import matieresRoutes from './routes/matieresRoutes.js'
import notesRoutes from './routes/notesRoutes.js'
import rolesRoutes from './routes/rolesRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

import notreStrategy from './auth/strategies.js'


database.sync()

const PORT = process.env.PORT

const app = express()

app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())

app.use('/roles',rolesRoutes)
app.use('/notes',notesRoutes)
app.use('/matieres',matieresRoutes)
app.use('/users',usersRoutes)
app.use(passport.initialize())

passport.use(notreStrategy)

app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))
