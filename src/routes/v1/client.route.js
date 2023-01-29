const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const isAuthenticated = require('../../middleware/isAuthenticated');
const {authenticateRegister, authenticateLogin} = require('../../middleware/authenticate');
const clientValidation = require('../../validations/client.validation');
const clientController = require('../../controllers/client.controller')



router.post('/register', validate(clientValidation.createClient), authenticateRegister('local-register-client'));
router.post('/login', authenticateLogin('local-login-client'));
router.post('/serviceListing/:serviceListingId/startContract',  validate(clientValidation.startContract), isAuthenticated('client'),  clientController.startContract )
router.get('/contracts', isAuthenticated('client'), clientController.getContracts)
module.exports = router;