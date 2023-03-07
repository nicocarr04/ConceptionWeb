import matieres from "./Matieres.js";
import notes from "./Notes.js";
import roles from "./Roles.js";
import users from "./Users.js";

users.hasMany(notes)
notes.belongsTo(users)

users.hasMany(matieres)
matieres.belongsToMany(users, {through: "UsersMatieres"}) // Fix doublons ici?

matieres.hasMany(notes)
notes.belongsTo(matieres)

users.hasMany(roles)
roles.belongsToMany(users, {through: "UsersRoles"}) // Fix doublons ici?

export { matieres, notes, users, roles}
