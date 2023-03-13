import { Router } from "express";
import rolesRules from "../validations/rolesValidations.js";
import { addRole, deleteRole, updateRole, getRoleById, getAllRoles } from "../controllers/roles.js";
import passport from 'passport'
import { verifierToken, isAdmin, isAdmin2 } from '../auth/autorisations.js'

const router = Router()

router
    .post('/', rolesRules, addRole)
    .get('/', passport.authenticate('jwt', { session: false }), verifierToken, isAdmin, getAllRoles)
    .get('/:id', getRoleById)
    .put('/:id', updateRole)
    .delete('/:id', deleteRole)

export default router

