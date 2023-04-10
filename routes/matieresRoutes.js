import { Router } from "express";
import { getAllMatieres, getMatiereById, deleteMatiere, updateMatiere  } from "../controllers/matieres.js";
import passport from 'passport'
import { verifierToken, isProfesseur } from '../auth/autorisations.js'

const router = Router()

router
    .get('/', passport.authenticate('jwt', { session: false }), verifierToken, isProfesseur, getAllMatieres)
    /*.get('/:professeurid', getMatiereByProfesseurId)*/
    .get('/:id', getMatiereById)
    .put('/:id', updateMatiere)
    .delete('/:id', deleteMatiere)

export default router