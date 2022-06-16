const express = require('express');
const authController = require('./auth.controller');
const validate = require('../../utils/validate');
const {createUser,login} = require('./auth.validation');

const router = express.Router();

router.post('/register',validate(createUser), authController.register);

router.post('/login',validate(login), authController.login);

module.exports = router