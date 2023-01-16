const express = require('express');
//const clientRoute = require('./client.route');
const workerRoute = require('./worker.route');

const router = express.Router();

//router.use('/client', clientRoute);
router.use('/worker', workerRoute);

module.exports = router;