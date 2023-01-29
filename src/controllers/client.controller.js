const { restart } = require('nodemon');
const { clientService } = require('../services');

exports.startContract = async (req, res) => {

    const clientId = req.user.id_client
    const serviceListingId = req.params.serviceListingId
    const units = req.body.units

    const contract = await clientService.startContract(clientId, serviceListingId, units);
    console.log(contract)
    if (contract) {
        res.status(200).json({ message: "Contract started", contract: contract })
    }
    else {
        res.status(401).json({ message: "Can't start contract with unexisting serviceListing" })
    }
}

exports.getContracts = async (req, res) => {
    const clientId = req.user.id_client
    const contracts = await clientService.getContracts(clientId)

    res.status(200).json({ contracts: contracts })
}
