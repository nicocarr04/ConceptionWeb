import { DataTypes } from "sequelize"
import database from "../connection.js";

 const notes = database.define('notes', {
    note: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
},
{ timestamps: false} 
)

export default notes