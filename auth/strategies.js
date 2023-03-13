import passport from "passport";
import { users } from '../models/index.js'
import passportJWT from "passport-jwt"   


const { ExtractJwt, Strategy } = passportJWT

const jwtOptions = {
    secretOrKey: process.env.TOKEN_SECRET, 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const notreStrategy = new Strategy(jwtOptions, (payload, done) => {
    const user = users.findOne({ where: { id: payload.id } })
    if (user) {
        done(null, user)
    } else {
        done(null, false)
    }
})

export default notreStrategy