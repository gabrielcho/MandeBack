const express = require('express');
const clientRoute = require('./client.route');
const workerRoute = require('./worker.route');

const router = express.Router();

router.use('/worker', workerRoute);
router.use('/client', clientRoute);

module.exports = router;

