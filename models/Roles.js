import { DataTypes } from "sequelize"
import database from "../connection.js";

const roles = database.define('roles', {
    nom: { type: DataTypes.STRING, allowNull: false }
},
{ timestamps: false} 
)

export default roles