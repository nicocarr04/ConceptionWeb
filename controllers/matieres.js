import { matieres } from "../models/index.js"

export const getAllMatieres = async (req, res) => {
    try {
        const result = await matieres.findAll()
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getMatiereById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })
    try {
        const result = await matieres.findByPk(id, { include: ['notes'] })  
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getMatiereByProfesseurId = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })
    try {
        // TODO: Ont veux pas chercher par la Pk mais bien par le professeurid
        const result = await matieres.find(id, { include: ['notes'], where: { professeurid } })  
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteMatiere = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ error: true, message: "L'id de la matiere est requis!" })
    try {
        const result = await matieres.destroy({ where: { id } })
        res.status(200).json({ message: `La matiere ${id} a été supprimée avec succès!` })
    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

export const updateMatiere = async (req, res) => {
    const { id } = req.params

    const { professeurid, titre } = req.body
    const updatedMatiere = { professeurid, titre }

    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })

    try {
        const result = await matieres.update(updatedMatiere, { where: { id } })
        res.json({ message: 'Matiere updaté!' })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}