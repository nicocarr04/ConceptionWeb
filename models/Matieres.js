import { DataTypes } from "sequelize"

const matieres = database.define('matieres', {
    titre: { type: DataTypes.STRING, allowNull: false }
},
{ timestamps: false} 
)

export default matieres