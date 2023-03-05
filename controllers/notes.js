import { notes } from "../models/index.js"

export const getAllNotes = async (req, res) => {
    try {
        const result = await notes.findAll()
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getNoteById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })
    try {
        const result = await notes.findByPk(id, { include: ['users', 'matieres'] })  
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getNoteByMatiereId = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })
    try {
        // TODO: Ont veux pas chercher par la Pk mais bien par le matiereid
        const result = await notes.find(id, { include: ['users', 'matieres'], where: { matiereid } })  
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getNoteByUserId = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })
    try {
        // TODO: Ont veux pas chercher par la Pk mais bien par le userid
        const result = await notes.find(id, { include: ['users', 'matieres'], where: { userid } })  
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ error: true, message: "L'id de la note est requis!" })
    try {
        const result = await notes.destroy({ where: { id } })
        res.status(200).json({ message: `La note ${id} a été supprimée avec succès!` })
    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params

    const { userid, matiereid, note, date } = req.body
    const updatedNote = { userid, matiereid, note, date }

    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })

    try {
        const result = await notes.update(updatedNote, { where: { id } })
        res.json({ message: 'Note updaté!' })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}