const { Router } = require('express');
const { getAllservices } = require('../services/serviceListing.service');

const router = Router();

router.get('/services', getAllservices);



module.exports = router;