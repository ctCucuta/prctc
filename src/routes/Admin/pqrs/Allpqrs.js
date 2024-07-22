const express = require('express');

const {allPqrs} = require('../../../controllers/admin/pqrs.controller');
const authMiddleware = require('../../../middleware/sesion');

const router  = express();

router.get('/allPqrs',authMiddleware, allPqrs)

module.exports= router;
