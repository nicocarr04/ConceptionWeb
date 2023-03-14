import { Router } from "express";
import notesRules from "../validations/notesValidations.js";
import usersRules from "../validations/usersValidations.js";
import matieresRules from "../validations/matieresValidations.js";
import { userLogin, addUser, deleteUser, updateUser, getUserById, getAllUsers, createUserNote, getUserNotes, createProfesseurMatiere, getProfesseurMatieres } from "../controllers/users.js";

const router = Router()

router
    .post('/login', userLogin)
    .post('/', usersRules, addUser)
    .post('/:id/notes', notesRules, createUserNote)
    .post('/:id/matieres', matieresRules, createProfesseurMatiere)
    .get('/:id', getUserById)
    .get('/', getAllUsers)
    .get('/:id/notes', getUserNotes)
    .get('/:id/matieres', getProfesseurMatieres)
    .delete('/:id', deleteUser)
    .put('/:id', updateUser)

export default router

