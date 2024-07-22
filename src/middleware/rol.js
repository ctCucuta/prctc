
const checkRol = (rol) => (req, res, next) => {
    try {
        const { user } = req
        console.log({ user })
        const rolesByUser = user.role;
      
        const checkValueRol= rol.some((rolSingle) => rolesByUser.includes(rolSingle))
     
        if (!checkValueRol) {
            res.status(403).send("Usuario  no tiene permisos")
            return
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(403).send("Error de Servidor ")
    }
}
module.exports = checkRol;