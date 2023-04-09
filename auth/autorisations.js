//Definir les autorisations pour les utilisateurs connectes
import jwt from 'jsonwebtoken'
import { users } from '../models/index.js'

//Verifier la presence du token et envoyer l'id de l'utilisateur aux middlewares suivants
export const verifierToken = (req, res, next) => {

    //Extraire le token de la requete
    const bearerToken = req.headers.authorization
    const token = bearerToken.split(' ')[1]

    //Verifier que le token est bien present sinon retourner un message d'erreur
    if (!token) return res.status(403).json({ message: 'Pas autorise a voir ces donnees' })

    //Verifierque le token est bien pour cet utilisateur
    jwt.verify(token, process.env.TOKEN_SECRET, (error, valeurDecode) => {
        if (error) return res.status(401).json({ message: error.message })

        //Mettre l'id de l'utilisateur pour passer aux callbacks suivants
        req.userId = valeurDecode.id
        next()
    })

}


// Verifier si quelqu'un a le droit admin
export const isAdmin = async (req, res, next) => {

    //Extraire le userId de la requete precedente
    const userId = req.userId

    //Retourner ce message si pas de userId
    if (!userId) return res.status(403).json({ message: "Pas d'utilisateur"})

    try {
        const user = await users.findByPk(userId)

        //Si pas de user, retourner ce message
        if (!user) return res.status(404).json({ message: 'utilisateur non existant' })

        try {
            //Extraire les roles de l'utilisateur de la base de donnee
            const roles = await user.getRoles()

            //Si pas de roles, retourner ce message
            if (!roles.length) return res.status(404).json({ message: 'Pas de roles' })

            //Verifier que l'utilisateur est admin
            const hasAdminRight = roles.map(role => role.nom).find(nom => nom.toLowerCase() === 'admin')
            if (hasAdminRight) {
                next()
                return
            }

            //Si l'utilisateur n'est pas admin, envoyer ce message
            return res.status(403).json({ message: 'Doit avoir les droits admin' })

        } catch (error) {
            return res.status(403).json({ message: error.message })
        }

    } catch (error) {
        return res.status(403).json({ message: error.message })

    }
}


//Le meme middleware que precedemment avec then...catch blocs
export const isProfesseur = (req, res, next) => {
    const userId = req.userId

    if (!userId) return res.status(403).json({ message: "Pas d'utilisateur" })

    users.findByPk(userId).then(user => {

        if (!user) return res.status(404).json({ message: 'utilisateur non existant' })

        user.getRoles().then(roles => {

            const hasAdminRight = roles.map(role => role.nom).find(nom => nom.toLowerCase() === 'professeur')

            if (hasAdminRight) {
                next()
                return
            }
            return res.status(403).json({ message: 'Doit avoir les droits professeur' })

        }).catch(error => {
            res.status(404).jscon({ message: error.message })

        })

    }).catch(error => {
        res.status(401).json({ message: error.message })
    })


}