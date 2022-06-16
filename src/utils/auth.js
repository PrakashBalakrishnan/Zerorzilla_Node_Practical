const jwt = require('jsonwebtoken');
const Token = require('../models/token.model');
const AppError = require('../utils/AppError');
const httpStatus = require('http-status');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});

const auth = async (req, res, next) => {
    if (!req.headers.authorization) {        
        return next(new AppError(httpStatus.UNAUTHORIZED, 'Please provide token'))
    }
    const jwtToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    const token = await Token.findOne({userId: jwtToken.userId, token: req.headers.authorization});
    if (!token) {
       return next(new AppError(httpStatus.UNAUTHORIZED, 'Please Authenticate'))
    }
    req.user = {userId: jwtToken.userId}
    next();
}

module.exports = auth