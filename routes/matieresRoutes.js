import { Router } from "express";
import { getAllMatieres, getMatiereById, getMatiereByProfesseurId, deleteMatiere, updateMatiere  } from "../controllers/matieres.js";
import passport from 'passport'
import { verifierToken, isAdmin, isAdmin2 } from '../auth/autorisations.js'

const router = Router()

router
    .get('/', passport.authenticate('jwt', { session: false }), verifierToken, isAdmin, getAllMatieres)
    .get('/:professeurid', getMatiereByProfesseurId)
    .get('/:id', getMatiereById)
    .put('/:id', updateMatiere)
    .delete('/:id', deleteMatiere)

export default router