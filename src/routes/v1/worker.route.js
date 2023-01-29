const express = require('express');
const workerController = require('../../controllers/worker.controller');
const router = express.Router();
const validate = require('../../middleware/validate');
const isAuthenticated = require('../../middleware/isAuthenticated');
const {authenticateRegister, authenticateLogin} = require('../../middleware/authenticate');
const workerValidation = require('../../validations/worker.validation');
const passport = require('passport')

router.post('/createListing', validate(workerValidation.createListing), isAuthenticated('worker'), workerController.createListing);
router.post('/register', validate(workerValidation.createWorker), authenticateRegister('local-register-worker') );
router.post('/login', authenticateLogin('local-login-worker'))//workerLogin('local-login-worker')
router.get('/logout', workerController.logoutWorker)
router.get('/contracts', isAuthenticated('worker'), workerController.getContracts)


module.exports = router;