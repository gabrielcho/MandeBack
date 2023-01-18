const express = require('express');
const workerController = require('../../controllers/worker.controller');
const router = express.Router();
const validate = require('../../middleware/validate');
const workerValidation = require('../../validations/worker.validation');

//Authentication middleware pending
router.post('/createListing',validate(workerValidation.createListing), workerController.createListing);
//Needs integration with passport
router.post('/createWorker', validate(workerValidation.createWorker), workerController.createWorker);


module.exports = router;