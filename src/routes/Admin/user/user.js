const express = require('express');

const { getUser,postUser, putUser, deleteUser, userId, resetPassword} = require('../../../controllers/admin/users.controller');
const authMiddleware = require('../../../middleware/sesion');
const checkRol = require('../../../middleware/rol');

const router = express();

router.get('/user/:id',authMiddleware,checkRol(["admin"]),userId)
router.post('/user',authMiddleware,checkRol(["admin"]),postUser)
router.get('/users',authMiddleware,checkRol(["admin"]),getUser)
router.put('/users/:id',authMiddleware,checkRol(["admin"]),putUser)
router.delete('/users/:id',authMiddleware,checkRol(["admin"]),deleteUser)
router.post('/newPassword',authMiddleware,checkRol(["admin"]),resetPassword)



module.exports=router;