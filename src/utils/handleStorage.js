const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../../src/storage`;
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const filename = `pqr-${Date.now()}.${ext}`;
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage });
module.exports = uploadMiddleware;