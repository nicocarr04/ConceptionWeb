import { Router } from "express";
import rolesRules from "../validations/rolesValidations.js";
import { addRole, deleteRole, updateRole, getRoleById, getAllRoles } from "../controllers/roles.js";

const router = Router()

router
    .post('/', rolesRules, addRole)
    .get('/', getAllRoles)
    .get('/:id', getRoleById)
    .put('/:id', updateRole)
    .delete('/:id', deleteRole)

export default router

