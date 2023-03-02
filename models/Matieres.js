import { DataTypes } from "sequelize"

const matieres = database.define('matieres', {
    professeurid: { type: DataTypes.INTEGER, allowNull: false },
    titre: { type: DataTypes.STRING, allowNull: false }
},
{ timestamps: false} 
)

export default matieres
