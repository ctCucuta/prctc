

const Pqrs = require('../../models/Pqrs'); // Importa el modelo de las PQRS

// const Storages = require('../../models/Storage');
const ResponseFile = require('../../models/ResponseFile');
const ResponsePqrs = require('../../models/ResponsePqrs');

const viewPqrs = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Falta el ID de la PQRS.' });
    }

    // Consultar la PQRS por su ID
    const pqrs = await Pqrs.findByPk(id);

    if (!pqrs) {
      return res.status(404).json({ message: 'La PQRS no fue encontrada.' });
    }

    return res.status(200).json(pqrs); // Devolver la PQRS encontrada
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al buscar la PQRS.' });
  }
};

const createPqrsResponse = async (req, res) => {
  try {
    const { pqrId, respuesta } = req.body;
    

    const pqrs = await Pqrs.findByPk(pqrId);
    if (!pqrs) {
      return res.status(404).json({ message: 'La PQRS no existe.' });
    }

    const response = await ResponsePqrs.create({ respuesta, pqrId: pqrId });
  


    if (req.file) {
      const { path, filename } = req.file;

      const newResponse = await ResponseFile.create({ url: path, filename,pqrId: pqrId});
      await response.addResponseFiles(newResponse);
      
    }



    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al crear la respuesta.' });
  }
};

const allResponse = async (req,res)=> {
  try {
    const response = await ResponsePqrs.findAll({
      include: {
        model: ResponseFile,
        as: 'responseFiles',
        attributes: ['id', 'filename'], // Incluir solo id y filename
      },
    })
    if (!response || response.length === 0) {
      res.status(404).send("No existen respuestas");
      return;
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({message : error.message})
  }
}
module.exports = {
  createPqrsResponse,
  viewPqrs,
  allResponse
};


