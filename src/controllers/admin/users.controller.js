// const Area = require('../../models/Area');
const Users = require('../../models/Users');
const { encrypt } = require('../../utils/handlePassword');

const userId = async(req,res )=> {
    try {
        const {id} = req.params
        if(!id){
            res.status(404).send("No existe usuario asociado a ese ID")
            return
        }
        const idUser = await Users.findByPk(id)
        res.status(200).json(idUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}

const getUser = async (req, res) => {
    try {
        const users = await Users.findAll();

        if (users.length === 0) {
            return res.status(404).send("No hay usuarios para mostrar");
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


const postUser = async (req, res) => {
    try {
        const { name, lastName, userName, email, password } = req.body;
        
        const existingUser = await Users.findOne({
            where: { email },
        });

        if (existingUser) {
            // Si el correo ya existe, envía una respuesta indicando que no es posible registrar el correo
            return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        }
        // Verifica si el usuario que realiza la solicitud es un administrador
        if (req.user && req.user.role === 'admin') {
            // Si es un administrador, encripta la contraseña
            const encryptedPassword = await encrypt(password);

            // Crea el nuevo usuario con la contraseña encriptada
            const newUser = await Users.create({
                name,
                lastName,
                userName,
                email,
                password: encryptedPassword,
            });

            res.status(200).json(newUser);
        } else {
            // Si no es un administrador, envía un mensaje de error
            res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const putUser = async (req, res) => {
    const { id } = req.params; // Obtén el ID del usuario de la URL
    const { name, lastName, userName, email, password } = req.body; // Datos que pueden ser actualizados

    try {
        const user = await Users.findByPk(id); // Encuentra al usuario por su ID

        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }

        // Actualiza solo los campos que se han enviado en la solicitud
        await user.update({
            name: name || user.name,
            lastName: lastName || user.lastName,
            userName: userName || user.userName,
            email: email || user.email,
            password: password || user.password
        });

        res.status(200).json(user); // Responde con el usuario actualizado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        const users = await Users.findByPk(id)
        if(!id){
            res.status(404).send("No existe usuario con ese ID")
            return
        }
        await users.destroy();
        res.status(200).send("Usuario eliminado con exito ")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).send("Se requiere el correo electrónico y la nueva contraseña para restablecer la contraseña.");
        }

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send("No se encontró ningún usuario con ese correo electrónico.");
        }

        // Actualizar la contraseña del usuario en la base de datos
        const encryptedPassword = await encrypt(newPassword);
        user.password = encryptedPassword;
        await user.save();

        res.status(200).send("Contraseña restablecida con éxito por el administrador.");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
module.exports = {  getUser,postUser, putUser, deleteUser,userId,resetPassword}