const { Op } = require('sequelize')
const Area = require('../../models/Area')

const oneArea = async(req, res)=>{
    try {
        const {name}= req.query
        if(!name){
            res.status(404).send("No existe el area proporcionada")
            return
        }
        const nameArea = await Area.findOne({
            where: {
                name: {
                    [Op.iLike]: name // Realiza la búsqueda sin diferenciar mayúsculas y minúsculas
                }
            }
        });
        if (!nameArea) {
            res.status(404).send("El área no existe");
            return;
        }
        res.status(200).json(nameArea)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
}

const allArea = async (req, res) => {
    try {
        const areas = await Area.findAll()
        if (!areas) {
            res.status(404).send("No existen areas creadas")
            return
        }
        res.status(200).json(areas)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const createArea = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(404).send("El campo no puede estar vacio");
            return
        }
        const newArea = await Area.create({ name });
        res.status(200).json(newArea)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const updateArea = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body;
        if (!id) {
            res.status(404).send("No se ha proporcionado un ID para actualizar el área.")
            return
        }
        // Buscar el área por su ID
        const area = await Area.findByPk(id);

        if (!area) {
            res.status(404).send("El área no existe.");
            return;
        }

        // Actualizar el nombre del área si se proporciona uno en el cuerpo de la solicitud
        if (name) {
            await area.update({ name });
            res.status(200).json({ message: "Área actualizada exitosamente." ,area});
        } else {
            res.status(400).send("El nombre del área no se ha proporcionado para la actualización.");
        }


    } catch (error) {
        console.log(error)
        res.status(500).jso({message : error.message})
    }
}
const deleteArea = async(req, res ) =>{
    try {
        const {id} = req.params;
        const areaDelete = await Area.findByPk(id)
        if(!id){
            res.status(404).send("No existe esa Area con ese Id")
            return
        }
        await areaDelete.destroy()
        res.status(200).send("Se elimino el Área")

    } catch (error) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
}


module.exports = {
    oneArea,
    createArea,
    allArea,
    updateArea,
    deleteArea
};
