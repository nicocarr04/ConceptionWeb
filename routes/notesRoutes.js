import { Router } from "express";
import { getAllNotes, getNoteById, getNoteByMatiereId, getNoteByUserId, deleteNote, updateNote } from "../controllers/notes.js";

const router = Router()

router
    .get('/', getAllNotes)
    .get('/:id', getNoteById)
    .get('/:matiereid', getNoteByMatiereId)
    .get('/:userid', getNoteByUserId)
    .put('/:id', updateNote)
    .delete('/:id', deleteNote)

export default router

