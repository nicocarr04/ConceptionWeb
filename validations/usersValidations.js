import { body } from "express-validator";

const usersRules = [
    body('nom').notEmpty().withMessage('Le nom ne peut pas être vide!'),
    body('prenom').notEmpty().withMessage('Le prenom ne peut pas être vide!'),
    body('naissance').notEmpty().withMessage('La date de naissance ne peut pas être vide!'),
    body('telephone').notEmpty().withMessage('Le telephone ne peut pas être vide!'),
    body('email').notEmpty().withMessage('Le email ne peut pas être vide!'),
    body('mot_de_passe').notEmpty().withMessage('Le mot de passe ne peut pas être vide!')
]

export default usersRules