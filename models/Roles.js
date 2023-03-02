import { DataTypes } from "sequelize"

const roles = database.define('roles', {
    nom: { type: DataTypes.STRING, allowNull: false }
},
{ timestamps: false} 
)

export default roles