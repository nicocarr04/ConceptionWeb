import { Router } from "express";
import { getAllNotes, getNoteById, getNoteByMatiereId, getNoteByUserId, deleteNote, updateNote } from "../controllers/notes.js";
import passport from 'passport'
import { verifierToken, isProfesseur } from '../auth/autorisations.js'

const router = Router()

router
    .get('/', passport.authenticate('jwt', { session: false }), verifierToken, isProfesseur, getAllNotes)
    .get('/:id', getNoteById)
    .get('/:matiereid', getNoteByMatiereId)
    .get('/:userid', getNoteByUserId)
    .put('/:id', updateNote)
    .delete('/:id', deleteNote)

export default router

