import { body } from "express-validator";

const notesRules = [
    body('note').notEmpty().withMessage('La note ne peut pas être vide!'),
    body('date').notEmpty().withMessage('La date ne peut pas être vide!')
]

export default notesRules