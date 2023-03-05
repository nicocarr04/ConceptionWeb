import { Router } from "express";

import { addRole, deleteRole, updateRole, getRoleById, getAllRoles } from "../controllers/roles.js";

const router = Router()

router
    .post('/', addRole)
    .get('/', getAllRoles)
    .get('/:id', getRoleById)
    .put('/:id', updateRole)
    .delete('/:id', deleteRole)



export default router

