import { Router } from "express";

import { getAllMatieres, getMatiereById, getMatiereByProfesseurId, deleteMatiere, updateMatiere  } from "../controllers/matieres.js";

const router = Router()

router
    .get('/', getAllMatieres)
    .get('/:professeurid', getMatiereByProfesseurId)
    .get('/:id', getMatiereById)
    .put('/:id', updateMatiere)
    .delete('/:id', deleteMatiere)

export default router