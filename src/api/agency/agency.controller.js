const agencyService = require('./agency.service');
const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const createResponse = require('../../utils/response');

const createAgency = catchAsync(async (req, res) => {
    const agency = await agencyService.createAgency(req.body);
    createResponse(res, httpStatus.CREATED, 'Agency and clients added successfully')
})

const updateClient = catchAsync(async (req, res) => {
    const agency = await agencyService.updateClient(req.params.clientId, req.body);
    createResponse(res, httpStatus.OK, 'Client details updated successfully')
})

const getTopClients = catchAsync(async (req, res) => {
    const clientDetails = await agencyService.getTopClients(req.params.agencyId);
    createResponse(res, httpStatus.OK, 'Client details fetched successfully', clientDetails)
})

module.exports = {
    createAgency,
    updateClient,
    getTopClients
}