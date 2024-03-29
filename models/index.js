import matieres from "./Matieres.js";
import notes from "./Notes.js";
import roles from "./Roles.js";
import users from "./Users.js";

users.hasMany(notes)
notes.belongsTo(users)

// users.hasMany(matieres)
users.belongsToMany(matieres, {through: "UsersMatieres"}) 
matieres.belongsToMany(users, {through: "UsersMatieres"}) 

matieres.hasMany(notes)
notes.belongsTo(matieres)

// users.hasMany(roles)
users.belongsToMany(roles, {through: "UsersRoles"}) 
roles.belongsToMany(users, {through: "UsersRoles"}) 

export { matieres, notes, users, roles}
