const express = require('express');
const workerController = require('../../controllers/worker.controller');
const router = express.Router();


router.get('/register', workerController.postListing)


module.exports = router;