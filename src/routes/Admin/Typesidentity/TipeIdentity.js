const express = require('express');
const {createTypeIdentity, getTipesIdentity, updateTipeIdentity, deleteTipeIdentity } = require('../../../controllers/admin/types.Identities.controller');
const authMiddleware = require('../../../middleware/sesion');
const checkRol = require('../../../middleware/rol');
const router = express();

router.get('/all',getTipesIdentity)
router.post('/createdIdentity',authMiddleware,checkRol(["admin"]),createTypeIdentity);
router.put('/update/:id', authMiddleware,checkRol(["admin"]),updateTipeIdentity)
router.delete('/delete/:id',authMiddleware,checkRol(["admin"]),deleteTipeIdentity)


module.exports = router;
