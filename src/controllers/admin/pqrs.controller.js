const Pqrs = require("../../models/Pqrs");
const PqrType = require("../../models/PqrsType");
const Storages = require("../../models/Storage");
const TipesIdentity = require("../../models/TipesIdentity");


const allPqrs = async (req, res) => {
    try {
      const allpqrs = await Pqrs.findAll({
        include: [
          {
            model: PqrType,
            attributes: ['name']
          },
          {
            model: TipesIdentity, // Incluye el modelo TipesIdentity
            attributes: ['tipeDocument'] // Puedes especificar los atributos que deseas mostrar
          },
          {
            model: Storages, // Incluye el modelo Storages
            attributes: [ 'filename'] // Especifica los atributos que deseas mostrar para los archivos adjuntos
          }
        ],
        attributes: { exclude: ['typeid'] }
      });
  
      if (!allpqrs || allpqrs.length === 0) {
        return res.status(404).send("No existen PQRS registradas.");
      }
  
      res.status(200).json(allpqrs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ha ocurrido un error al consultar las PQRS." });
    }
  };

module.exports ={
    allPqrs
}