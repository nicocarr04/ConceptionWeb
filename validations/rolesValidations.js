import { body } from "express-validator";

const rolesRules=[
    body('nom').notEmpty().withMessage('Le nom ne peut pas être vide!')
]

export default rolesRules