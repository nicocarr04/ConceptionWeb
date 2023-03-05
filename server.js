import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import database from './connection.js'

import matieresRoutes from './routes/matieresRoutes.js'
import notesRoutes from './routes/notesRoutes.js'
import rolesRoutes from './routes/rolesRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

database.sync()

const PORT = process.env.PORT

const app = express()

app.use('/roles',rolesRoutes)
app.use('/notes',notesRoutes)
app.use('/matieres',matieresRoutes)
app.use('/users',usersRoutes)

app.listen(PORT, () => console.log(`Serveur running on port ${PORT}`))
