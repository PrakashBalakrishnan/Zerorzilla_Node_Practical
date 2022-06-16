const express = require('express');
const authRoute = require('../api/auth/auth.route');
const agencyRoute = require('../api/agency/agency.route');

const router = express.Router();

router.use('/user', authRoute);

router.use('/agency', agencyRoute)

module.exports = router;