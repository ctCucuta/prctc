const Pqrs = require("../../models/Pqrs");
const PqrType = require("../../models/PqrsType");
const Storages = require("../../models/Storage");
const { transporter, mailDetails } = require('../../mailer/nodemailer');
const TipesIdentity = require("../../models/TipesIdentity");


const allPqrsCtc = async (req, res) => {
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
  const pqrsPost = async (req, res) => {
    try {
      const { name, lastName, identity, address, phone, email, description, typeId,typeDocument  } = req.body;
      console.log("cuerpo de la solicitud ", req.body)
      if (!name || !lastName || !identity || !address || !phone || !email || !description || !typeId ||!typeDocument ) {
        return res.status(400).send("Faltan datos");
      }
  
      const lastPqr = await Pqrs.findOne({
        order: [['createdAt', 'DESC']]
      });
  
      let consecutive = "PQRSDF-CTC-" + new Date().getFullYear() + "-0001";
  
      if (lastPqr) {
        const lastConsecutive = lastPqr.consecutive;
  
        const year = lastConsecutive.split('-')[2];
        let lastNumber = parseInt(lastConsecutive.split('-')[3]);
  
        if (year === new Date().getFullYear().toString()) {
          lastNumber++;
          consecutive = "PQRSDF-CTC-" + year + "-" + lastNumber.toString().padStart(4, '0');
        }
      }
  
      const newPqr = await Pqrs.create({
        name,
        lastName,
        identity,
        phone,
        address,
        email,
        description,
        consecutive
      });
  
      const pqrType = await PqrType.findByPk(typeId);
      if (pqrType) {
        await newPqr.setPqrTypes([pqrType]);
      }
      const tipesIdentity = await TipesIdentity.findOne({
        where: { tipeDocument: typeDocument }
      });
  
      if (!tipesIdentity) {
        // Si no se encuentra el tipo de documento, envía una respuesta de error
        return res.status(400).send("Tipo de documento no válido");
      
    }
    await newPqr.setTipesidentity(tipesIdentity);
    if (req.file) {
      const { filename, path } = req.file;
      // Crea un nuevo Storage para el archivo adjunto
      const newStorage = await Storages.create({
        url: path,
        filename: filename
      });
      
      // Asocia el nuevo Storage con la PQR creada
      await newPqr.addStorage(newStorage);
    }
    
    const mailOptions = mailDetails(email,newPqr.name,newPqr.consecutive);
      mailOptions.subject = ` Número de radicado: ${consecutive}`; // Asunto del correo con el número de radicado
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send('Error al enviar el correo electrónico');
        } else {
          console.log('Correo electrónico enviado: ' + info.response);
          const notificationOptions = {
            from: 'pruebadesarrollo2184@gmail.com',
            to: 'pruebadesarrollo2184@gmail.com',  // Reemplaza con la dirección de correo deseada
            subject: 'Nueva PQR creada',
            text: `Se ha creado una nueva PQR con el número de radicado: ${newPqr.consecutive}`,
          };
          transporter.sendMail(notificationOptions, function (notificationError, notificationInfo) {
            if (notificationError) {
              console.log(notificationError);
              // Maneja cualquier error al enviar la notificación
            } else {
              console.log('Notificación enviada: ' + notificationInfo.response);
            }
          });
          res.status(201).json(newPqr);
        }
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ha ocurrido un error al crear la PQR." });
    }
  };
  

module.exports ={
    allPqrsCtc,
    pqrsPost
}