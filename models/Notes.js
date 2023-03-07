import { DataTypes } from "sequelize"
import database from "../connection.js";

 const notes = database.define('notes', {
    //  userid: { type: DataTypes.INTEGER, allowNull: false },
    //  matiereid: { type: DataTypes.INTEGER, allowNull: false },
    note: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
},
{ timestamps: false} 
)

export default notes