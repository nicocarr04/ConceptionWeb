import { Router } from "express";
import notesRules from "../validations/notesValidations.js";
import usersRules from "../validations/usersValidations.js";
import matieresRules from "../validations/matieresValidations.js";
import rolesRules from "../validations/rolesValidations.js";
import passport from 'passport'
import { verifierToken, isProfesseur } from '../auth/autorisations.js'
import { userLogin, addUser, deleteUser, updateUser, getUserById, getAllUsers, createUserNote, getUserNotes, createUserMatiere, getUserMatieres, createUserRole, getUserRoles } from "../controllers/users.js";

const router = Router()

router
    .post('/login', userLogin)
    .post('/', usersRules, addUser)
    .post('/:id/notes', passport.authenticate('jwt', { session: false }), verifierToken, isProfesseur, notesRules, createUserNote)
    .post('/:id/matieres', passport.authenticate('jwt', { session: false }), verifierToken, isProfesseur, matieresRules, createUserMatiere)
    .post('/:id/roles', rolesRules, createUserRole)
    .get('/:id', getUserById)
    .get('/', getAllUsers)
    .get('/:id/roles', getUserRoles)
    .get('/:id/notes', getUserNotes)
    .get('/:id/matieres', getUserMatieres)
    .delete('/:id', deleteUser)
    .put('/:id', updateUser)

export default router

