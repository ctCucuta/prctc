const TipesIdentity = require('../../models/TipesIdentity');
const TypesIdentity = require('../../models/TipesIdentity');

const getTipesIdentity = async(req,res) =>{
    try {
        const allTipes = await TypesIdentity.findAll();
        if(!allTipes){
            res.status(404).send("No existen tipos de identidad")
            return
        }
        res.status(200).json(allTipes)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const createTypeIdentity = async(req, res)=>{
    try {
        const {tipeDocument} = req.body;
        if( !tipeDocument){
            res.status(404).send("El tipo de documento no puede estar vacio")
            return
        }
        const newTipe= await TypesIdentity.create({tipeDocument})
        res.status(200).json(newTipe)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}
const updateTipeIdentity = async (req, res ) =>{
    const {id} = req.params
    const {tipeDocument} =req.body
    try {
        const updateIdentity = await TypesIdentity.findByPk(id);
        if(!id) {
            res.status(404).send("No existe tipo con ese ID")
            return
        }
        await updateIdentity.update({
            tipeDocument
        })
        res.status(200).json(updateIdentity)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });   
    }
}
const deleteTipeIdentity = async(req,res)=>{
    try {
        const {id} = req.params
        const identity = await TipesIdentity.findByPk(id)
        if(!identity){
            res.status(404).send("No existe tipo de documento con ese ID ")
            return
        }
        await identity.destroy();
        res.status(200).send("Tipo de Identidad eleminada")
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports={
     createTypeIdentity,
     getTipesIdentity,
     updateTipeIdentity,
     deleteTipeIdentity
};