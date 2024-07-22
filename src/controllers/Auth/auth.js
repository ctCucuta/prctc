const { matchedData } = require('express-validator');
const { encrypt,compare} = require('../../utils/handlePassword')
const Users = require('../../models/Users');
const { tokenSign } = require('../../utils/handleJwt');

const registerCtrl = async (req, res) => {
    try {
        const requestData = matchedData(req);
        
        // Verifica si ya existe un usuario con la misma dirección de correo electrónico
        const existingUser = await Users.findOne({
            where: { email: requestData.email }
            });

        if (existingUser) {
            // Si el correo ya existe, envía una respuesta indicando que no es posible registrar el correo
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }

        // Si no existe, procede con la creación del usuario
        const password = await encrypt(requestData.password);
        const body = { ...requestData, password };
        const newUser = await Users.create(body);

        res.send(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
}
const loginCtrl = async(req,res)=>{
    try {
        req=matchedData(req) // curar la data para que solo llegue email y password
        const user = await Users.findOne({
            where:{email:req.email}
        });
        console.log(user.password )
        
        if(!user){
            res.status(404).send("User_Not_Existis")
            return
        }
        const hashPassword = user.password;
      
        const check = await compare(req.password,hashPassword)
       
        if(!check){
            res.status(401).send("Password Invalid")
            return
        }
        user.set('password', undefined, { strict: false });
        const data ={
            token:await tokenSign(user),
            user:user
        }
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
}

module.exports = {
    registerCtrl,
    loginCtrl
}