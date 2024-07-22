const PqrsType = require('../../models/PqrsType');


const getTypePqrs = async(req, res) =>{
    try {
        const nameType = await PqrsType.findAll()
        if( nameType.length === 0){
            res.status(404).send("no existen Tipos de PQR")
            return
        }
        res.status(200).json(nameType)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });        
    }
}
const postTypePqr = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            res.status(404).send("los campos no pueden estar vacios")
            return
        }
        const existingType = await PqrsType.findOne({
            where: { name }
        });

        if (existingType) {
            res.status(409).send("El tipo ya existe"); // Código 409 para indicar conflicto
            return;
        }
        const type= await PqrsType.create({
            name
        })
        res.status(200).json(type)
    } catch (error) {
        console.log(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send("El tipo ya existe"); // Código 409 para indicar conflicto
        } else {
            res.status(500).json({ message: error.message });
        }  
    }
}

const updatePqrsType = async( req, res) =>{
    const {id}= req.params
    const {name} = req.body;
    try {
        const updateType = await PqrsType.findByPk(id);
        if(!id){
            res.status(404).send("No existe tipo con ese ID")
            return
        }
        await updateType.update({
            name
        })
        res.status(200).json(updateType)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });        
    
    }
}
const deleteType = async(req,res)=>{
    const {id}= req.params;
    try {
        const type = await PqrsType.findByPk(id)
        if(!id){
            res.status(404).send("No existe el Id ")
            return
        }
        await type.destroy()
        res.status(200).send("Tipo de PQR Eliminada ")
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message }); 
    }
}
module.exports = {
    postTypePqr,
    getTypePqrs,
    updatePqrsType,
    deleteType
}