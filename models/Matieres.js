import { DataTypes } from "sequelize"
import database from "../connection.js";

// TODO: Corriger la création d'un doublons
const matieres = database.define('matieres', {
    // professeurid: { type: DataTypes.INTEGER, allowNull: false },
    titre: { type: DataTypes.STRING, allowNull: false }
},
{ timestamps: false} 
)

export default matieres
