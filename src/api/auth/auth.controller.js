const authService = require('./auth.service');
const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const createResponse = require('../../utils/response');

const register = catchAsync(async (req, res) => {
    const userDetails = await authService.register(req);
    createResponse(res, httpStatus.CREATED,'User created successfully', userDetails);
})

const login = catchAsync(async (req, res) => {
    const data = await authService.login(req.body);
    createResponse(res, httpStatus.OK,'Logged in successfully', data);
})

module.exports = {
    register,
    login
}