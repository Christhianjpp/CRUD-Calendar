const { response } = require("express")
const jwt = require('jsonwebtoken')


const validarJWT = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token')  // obtengo el token 

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: ' no hay token en la petición'
        })
    }

    try {

        const { uid, name } = jwt.verify(   // extraigo el uid del token
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        })

    }

    next()

}


module.exports = {
    validarJWT
}