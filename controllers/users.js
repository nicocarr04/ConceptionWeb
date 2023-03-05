import { users } from "../models/index.js"

export const addUser = async (req, res) => {
    const { nom, prenom, naissance, photo, telephone, email, mot_de_passe, roleid } = req.body
    const newUser = { nom, prenom, naissance, photo, telephone, email, mot_de_passe, roleid }

    try {
        const result = await users.create(newUser)
        res.status(201).json({ data: result, message: 'User créer avec succès!' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id
    if (!userId) return res.status(404).json({ error: true, message: error.message })

    try {
        const result = await users.destroy({ where: { id: userId } })
        res.status(200).json({ data: result, message: 'User supprimé!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const {  id } = req.params

    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })

    const { nom, prenom, naissance, photo, telephone, email, mot_de_passe, roleid } = req.body
    const updatedUser = { nom, prenom, naissance, photo, telephone, email, mot_de_passe, roleid }
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
        const result = await users.findByPk(id)
        res.status(200).json({ data: result })

    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const result = await users.findAll({})
        res.status(200).json({ data: result, message: "Tous les users reçus!" })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

export const createUserNote = async (req, res) => {
    const  userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })
    const { userid, matiereid, note, date } = req.body
    const newNote = { userid, matiereid, note, date }

    try {
        const currentUser = await users.findByPk(userId)
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

export const createProfesseurMatiere = async (req, res) => {
    const  userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })
    const { professeurid, titre } = req.body
    const newMatiere = { professeurid, titre }

    try {
        const currentUser = await users.findByPk(userId)
        const result = await currentUser.createMatiere(newMatiere)
        res.status(201).json({ data: result, message: 'Matière ajoutée!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getProfesseurMatieres = async (req, res) => {
    const userId = req.params.id
    if (!userId) res.status(404).json({ error: true, message: error.message })

    try {
        const currentUser = await users.findByPk(userId)
        const result = await currentUser.getMatieres()
        res.status(200).json({ data: result, message: 'Matière retournée!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}