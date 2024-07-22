const express = require('express')
const {  postTypePqr, getTypePqrs, updatePqrsType, deleteType} = require('../../../controllers/admin/typesPqrs.controller')
const authMiddleware = require('../../../middleware/sesion')
const checkRol = require('../../../middleware/rol')

const router = express()

router.post('/typePqr',authMiddleware,checkRol(["admin"]), postTypePqr)
router.get('/types', getTypePqrs)
router.put('/types/:id',authMiddleware,checkRol(["admin"]),updatePqrsType)
router.delete('/typesDelete/:id',authMiddleware,checkRol(["admin"]),deleteType)

module.exports= router;