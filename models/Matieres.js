import { DataTypes } from "sequelize"
import database from "../connection.js";

const matieres = database.define('matieres', {
    userId: {
        type: DataTypes.INTEGER,
        field: 'professeurId'
    },
    titre: { type: DataTypes.STRING, allowNull: false }
},
{ timestamps: false} 
)

export default matieres
