const express = require('express');
const {registerCtrl,loginCtrl} = require('../../controllers/Auth/auth')
const {validateRegister, validateLogin}= require('../../validators/auth');


const router= express();

router.post('/register', validateRegister,registerCtrl)
router.post('/login', validateLogin,loginCtrl)

module.exports = router;



// router.get('/getSession',validateLogin,getSession)

