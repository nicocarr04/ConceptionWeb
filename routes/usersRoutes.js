import { Router } from "express";

import { addUser, deleteUser, updateUser, getUserById, getAllUsers, createUserNote, getUserNotes, createProfesseurMatiere, getProfesseurMatieres } from "../controllers/users.js";

const router = Router()

router
    .post('/', addUser)
    .post('/:id/notes', createUserNote)
    .post('/id/matieres', createProfesseurMatiere)
    .get('/:id', getUserById)
    .get('/', getAllUsers)
    .get('/', getUserNotes)
    .get('/', getProfesseurMatieres)
    .delete('/:id', deleteUser)
    .put('/:id', updateUser)

export default router

