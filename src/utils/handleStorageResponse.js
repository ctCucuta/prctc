const multer = require('multer');
const storageForResponses = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathForResponses = `${__dirname}/../../response`;
        cb(null, pathForResponses);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
     
        const filename = `file-${Date.now()}.${ext}`;
        
        cb(null, filename)
    }
   
});
const uploadMiddlewareForResponses = multer({ storage: storageForResponses });
module.exports = uploadMiddlewareForResponses;