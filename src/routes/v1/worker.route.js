const express = require('express');
const workerController = require('../../controllers/worker.controller');
const router = express.Router();
const validate = require('../../middleware/validate');
const isAuthenticated = require('../../middleware/isAuthenticated');
const authenticate = require('../../middleware/authenticate');
const workerValidation = require('../../validations/worker.validation');
const passport = require('passport')

//Authentication middleware pending
router.post('/createListing', validate(workerValidation.createListing), isAuthenticated, workerController.createListing);
//Needs integration with passport
//router.post('/register', validate(workerValidation.createWorker), passport.authenticate('local-register-worker'));
router.post('/register', validate(workerValidation.createWorker), authenticate('local-register-worker') );

router.post('/login', authenticate('local-login-worker'))
router.get('/logout', workerController.logoutWorker)


module.exports = router;