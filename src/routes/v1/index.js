const express = require('express');
const clientRoute = require('./client.route');
const workerRoute = require('./worker.route');
const serviceListingController = require('../../controllers/serviceListing.controller')


const router = express.Router();

router.use('/worker', workerRoute);
router.use('/client', clientRoute);
router.get('/serviceListings', serviceListingController.getServiceListings )

module.exports = router;

