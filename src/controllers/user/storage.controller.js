
const Storages = require('../../models/Storage')
const PUBLIC_URL = process.env.PUBLIC_URL;




const postStorage = async (req, res) => {
    try {
        const { file } = req
        if (!file) {
            return res.status(400).json({ message: "No se encontró ningún archivo." });
        }
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        console.log(fileData)
        const data = await Storages.create(fileData)
        res.status(200).json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });

    }
}
const getStoredFiles = async (req, res) => {
    try {
        const files = await Storages.findAll(); // Obtener todos los archivos de la base de datos
        if (files.length === 0) {
            return res.status(404).json({ message: "No se encontraron archivos almacenados." });
        }

        // Mapear los datos para enviar solo la información necesaria
        const fileData = files.map(file => {
            return {
                filename: file.filename,
                url: `${process.env.PUBLIC_URL}/${file.filename}`, // Utiliza la URL pública de tu entorno
                createdAt: file.createdAt // Puedes añadir más detalles si están presentes en tu modelo de base de datos
            };
        });

        res.status(200).json(fileData); // Enviar la información de los archivos almacenados
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    postStorage,
    getStoredFiles
}
// const Storages = require('../models/Storage');

// const postStorage = async (req, res) => {
//     try {
//         const { file } = req;
//         if (!file) {
//             return res.status(400).json({ message: "No se encontró ningún archivo." });
//         }

//         // Crea un objeto con los datos del archivo a guardar
//         const fileData = {
//             filename: file.originalname,
//             mimeType: file.mimetype,
//             fileData: file.buffer.toString('base64') // Guarda el archivo directamente en base64
//         };

//         // Guarda los datos del archivo en la base de datos
//         const data = await Storages.create(fileData);

//         res.status(200).json(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     postStorage
// };
