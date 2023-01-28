const {clientService} = require('../services');

exports.startContract = async (req, res) => {

    const clientId = req.user.id_client
    const serviceListingId = req.params.serviceListingId
    const units = req.body.units

    const contract = clientService.startContract(clientId, serviceListingId, units);
    res.send(200)
}