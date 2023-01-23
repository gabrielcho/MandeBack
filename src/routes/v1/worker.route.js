const express = require('express');
const workerController = require('../../controllers/worker.controller');
const router = express.Router();
const validate = require('../../middleware/validate');
const isAuthenticated = require('../../middleware/isAuthenticated');
const workerValidation = require('../../validations/worker.validation');
const passport = require('passport')

//Authentication middleware pending
router.post('/createListing',validate(workerValidation.createListing), isAuthenticated, workerController.createListing);
//Needs integration with passport
router.post('/register', validate(workerValidation.createWorker), passport.authenticate('local-register', {successRedirect: '/', failureRedirect: '/login'}));

router.post('/login', passport.authenticate('local-login', {successRedirect: '/success', failureRedirect: '/failure'}) )
router.get('/logout', workerController.logoutWorker)


module.exports = router;