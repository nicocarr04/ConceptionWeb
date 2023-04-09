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
        const result = await matieres.findByPk(id, { include: ['users'] })  
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// PS: Ce fier à getUserNotes
export const getMatiereByProfesseurId = async (req, res) => {
    const professeurid = req.params.id
    if (!professeurid) res.status(404).json({ error: true, message: error.message })

    try {
        const currentProfesseur = await users.findByPk(professeurid)
        const result = await currentProfesseur.getMatieres()
        res.status(200).json({ data: result, message: 'Matiere retournée!' })
    } catch (error) {
        res.status(400).json({ message: error.message })
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

    const { titre } = req.body
    const updatedMatiere = { titre }

    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })

    try {
        const result = await matieres.update(updatedMatiere, { where: { id } })
        res.json({ message: 'Matiere updaté!' })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
} 