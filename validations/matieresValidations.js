import { body } from "express-validator";

const matieresRules = [
    body('titre').notEmpty().withMessage('Le titre de la matière ne peut pas être vide!'),
]

export default matieresRules