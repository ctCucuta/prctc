const express = require('express');
const {allArea, createArea,  updateArea, deleteArea, oneArea } = require('../../../controllers/admin/area.controller');
const authMiddleware = require('../../../middleware/sesion');
const router = express();


router.get('/area',authMiddleware,oneArea)
router.get('/allArea',authMiddleware,allArea);
router.post('/createArea',authMiddleware, createArea);
router.put('/update/:id',authMiddleware, updateArea);
router.delete('/delete/:id',authMiddleware, deleteArea)

module.exports = router;