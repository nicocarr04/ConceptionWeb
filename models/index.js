import matieres from "./Matieres.js";
import notes from "./Notes.js";
import roles from "./Roles.js";
import users from "./Users.js";

users.hasMany(notes)
notes.belongsTo(users)

matieres.hasMany(notes)
notes.belongsTo(matieres)

users.hasOne(roles)
roles.belongsTo(users)

export { matieres, notes, users, roles}