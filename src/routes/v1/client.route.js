const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const isAuthenticated = require('../../middleware/isAuthenticated');
const authenticate = require('../../middleware/authenticate');
const clientValidation = require('../../validations/client.validation');
const passport = require('passport')

router.use('/register', validate(clientValidation.createClient), authenticate('local-register-client'));
router.use('/login', authenticate('local-login-client'));

module.exports = router;