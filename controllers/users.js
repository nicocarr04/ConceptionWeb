import { users } from "../models/index.js"
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const userLogin = async (req, res) => {
    const { email, mot_de_passe } = req.body
    if (email) {
        try {
            const user = await users.findOne({ where: { email } })

            if (!user) res.status(404).json({ message: "No such email exists!" })

            //Verification en comparant les mots de passe
            const verifyPassword = await bcrypt.compare(mot_de_passe, user.mot_de_passe)

            //Si les mots de passe sont identiques
            if (verifyPassword) {
                let payload = { id: user.id }
                let token = jwt.sign(payload, process.env.TOKEN_SECRET)
                res.status(200).json({ data: { user, token, payload } })
            } else {
                res.status(401).json({ message: "Le mot de passe est incorrect!" })
            }

        } catch (error) {
            res.status(401).json({ message: error.message })
        }
    }
}

export const addUser = async (req, res) => {
    const { nom, prenom, naissance, photo, telephone, email, mot_de_passe } = req.body

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10)

    const newUser = { nom, prenom, naissance, photo, telephone, email, mot_de_passe: hashedPassword }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const result = await users.create(newUser)
        res.status(201).json({ data: result, message: 'User créer avec succès!' })
    } catch (error) {
        res.status(400).json({message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await users.destroy({ where: { id: id } })
        res.status(200).json({ data: result, message: 'User supprimé!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const {  id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })

    const { nom, prenom, naissance, photo, telephone, email, mot_de_passe/*, roleid*/ } = req.body
    const updatedUser = { nom, prenom, naissance, photo, telephone, email, mot_de_passe/*, roleid*/ }
    try {
        const result = await users.update(updatedUser, { where: { id } })
        res.status(200).json({ message: 'User a été mis à jour!' })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })

    try {
        const result = await users.findByPk(id, { include: ['roles']})
        res.status(200).json({ data: result })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try { // Marche danas notre cas vu qu'un prof peut-être un élève fictif
        const result = await users.findAll({ include: ['roles']})
        res.status(200).json({ data: result, message: "Tous les users reçus!" })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

export const createUserNote = async (req, res) => {
    const userid = req.params.id
    if (!userid) res.status(404).json({ error: true, message: error.message })
    const { note, date } = req.body
    const newNote = { note, date }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const currentUser = await users.findByPk(userid)
        const result = await currentUser.createNote(newNote)
        res.status(201).json({ data: result, message: 'Note ajoutée!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserNotes = async (req, res) => {
    const userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })

    try {
        const currentUser = await users.findByPk(userId)
        const result = await currentUser.getNotes()
        res.status(200).json({ data: result, message: 'Note retournée!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createUserRole = async (req, res) => {
    const id = req.params.id
    if (!id) res.status(404).json({ error: true, message: error.message })

    const { nom } = req.body
    const newRole = { nom }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const currentUser = await users.findByPk(id)
        const result = await currentUser.createRole(newRole)
        res.status(201).json({ data: result, message: 'Role ajouté!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserRoles = async (req, res) => {
    const userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })

    try {
        const currentUser = await users.findByPk(userId)
        const result = await currentUser.getRoles()
        res.status(200).json({ data: result, message: 'Roles retournés!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createUserMatiere = async (req, res) => {
    const userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })

    const { titre } = req.body
    const newMatiere = { titre }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    try {
        const currentUser = await users.findByPk(userId)
        const result = await currentUser.createMatiere(newMatiere)
        res.status(201).json({ data: result, message: 'Matière ajouté!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserMatieres = async (req, res) => {
    const userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })

    try {
        const currentUser = await users.findByPk(userId)
        const result = await currentUser.getMatieres()
        res.status(200).json({ data: result, message: 'Matière retournés!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}