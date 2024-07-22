const express = require('express')
const router= express();
const {postPqr} = require('../../../../controllers/user/pqrs.controller')
const uploadMiddleware = require('../../../../utils/handleStorage');

router.post('/createPqr', uploadMiddleware.single('file'), postPqr);



module.exports= router; 
