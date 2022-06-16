const User = require('../../models/user.model');
const path = require('path');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');
const bcrypt = require('bcryptjs');
const Token = require('../../models/token.model');
require('dotenv').config({path: path.join(__dirname, '../.env')})
const httpStatus = require('http-status');

const generateToken = (userId, secret) => {
    const payload = {
        userId: userId
    };
    return jwt.sign(payload, secret);
};

const checkPassword = async (password, correctPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, correctPassword);
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Wrong password');
    }
};

const checkDuplicateEmail = async (email) => {
    const userData = await User.findOne({email: email});
    if (userData)
        throw new AppError(httpStatus.CONFLICT, 'Email is already used');
}

const register = async (req) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    await checkDuplicateEmail(userData.email)
    const user = await User.create(userData);
    return user;
}

const login = async (loginData) => {
    const login = await User.findOne({email: loginData.email});
    if (login) {
        await checkPassword(loginData.password, login.password)
        await Token.deleteMany({userId: login._id, type: "Login"})
        const token = generateToken(login._id, process.env.JWT_SECRET);
        const insertToken = await Token.create({userId: login._id, token: token, type: "Login"});
        return {name: login.name, token: token}
    } else {
        throw new AppError(httpStatus.NOT_FOUND, "Email is not registered");
    }
}

module.exports = {
    register,
    login
}