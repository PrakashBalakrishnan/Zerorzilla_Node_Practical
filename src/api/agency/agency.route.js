const agencyController = require('./agency.controller');
const express = require('express');
const validate = require('../../utils/validate');
const {createAgency,getClient,updateClientId} = require('./agency.validation');
const auth = require('../../utils/auth');

const router = express.Router();

router.post('/createAgencyClient',auth, validate(createAgency), agencyController.createAgency);

router.patch('/updateClient/:clientId',auth, agencyController.updateClient);

router.get('/getTopClients/:agencyId',auth, agencyController.getTopClients);

module.exports = router;