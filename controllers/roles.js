import { roles } from "../models/index.js"

export const addRole = async (req, res) => {
    const { nom } = req.body
    const newRole = { nom }

    try {
        const result = await roles.create(newRole)
        res.status(201).json({ data: result, message: 'Role crée avec succès!' })
    } catch (error) {
        res.status(400).json({ error: true, message: error.message })
    }
}

export const deleteRole = async (req, res) => {
    const { id } = req.params
    if (!id) res.status(404).json({ error: true, message: "L'id du role est requis!" })
    try {
        const result = await roles.destroy({ where: { id } })
        res.status(200).json({ message: `Le role ${id} a été supprimée avec succès!` })
    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

export const updateRole = async (req, res) => {
    const { id } = req.params

    const { nom } = req.body
    const updatedRole = { nom }

    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })

    try {
        const result = await roles.update(updatedRole, { where: { id } })
        res.json({ message: 'Role updaté!' })

    } catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

export const getRoleById = async (req, res) => {
    const { id } = req.params
    if (!id) return res.status(404).json({ message: 'id est obligatoire!' })
    try {
        const result = await roles.findByPk(id, { include: ['users'] })  
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getAllRoles = async (req, res) => {
    try {
        const result = await roles.findAll()
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}