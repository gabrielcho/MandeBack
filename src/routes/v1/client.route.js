const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const isAuthenticated = require('../../middleware/isAuthenticated');
const {authenticateRegister, authenticateLogin} = require('../../middleware/authenticate');
const clientValidation = require('../../validations/client.validation');
const clientController = require('../../controllers/client.controller')



router.use('/register', validate(clientValidation.createClient), authenticateRegister('local-register-client'));
router.use('/login', authenticateLogin('local-login-client'));
router.use('/serviceListing/:serviceListingId/startContract',  validate(clientValidation.startContract), isAuthenticated('client'),  clientController.startContract )
        
module.exports = router;