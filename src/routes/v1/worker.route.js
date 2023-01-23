const express = require('express');
const workerController = require('../../controllers/worker.controller');
const router = express.Router();
const validate = require('../../middleware/validate');
const workerValidation = require('../../validations/worker.validation');


router.post('/createListing',validate(workerValidation.createListing), workerController.createListing)
router.post('/signup/worker', signupWorker)


module.exports = router;