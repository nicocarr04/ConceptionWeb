import { DataTypes } from "sequelize"

const users = database.define('users', {
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    naissance: {type: DataTypes.DATEONLY, allowNull: false},
    photo: {type: DataTypes.STRING, allowNull: false },
    telephone: {type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    mot_de_passe: {type: DataTypes.STRING, allowNull:false}
},
{ timestamps: false} 
)

export default users