const express = require('express');
const { allPqrsCtc, pqrsPost } = require('../../controllers/Users/pqrsctc.controller');
const { createPqrsResponse, viewPqrs, allResponse } = require('../../controllers/Users/response.controller');
const uploadMiddleware = require('../../utils/handleStorage');
const authMiddleware = require('../../middleware/sesion');




const router = express();

router.get('/pqrsCtc',authMiddleware ,allPqrsCtc);
router.get('/responses',authMiddleware, allResponse)
router.post('/postPqrs',authMiddleware, uploadMiddleware.single('file'), pqrsPost)

router.get('/:id',authMiddleware,viewPqrs)


module.exports=router; 



// router.post('/pqrs/response',authMiddleware,uploadMiddlewareForResponses.single('myfile'),createPqrsResponse)
// const uploadMiddlewareForResponses= require('../../utils/handleStorageResponse');