const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidators");

const validateLogin = [
    check("email").exists().notEmpty(),
    check("password").exists().notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];
const validateRegister = [
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("lastName").exists().notEmpty(),
    check("userName").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 15 }),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = { validateLogin, validateRegister };