
const db = require('../db');

const startContract = async (clientId, serviceListingId, units) => {
    const listingExists = await db.one(`SELECT EXISTS (SELECT 1 FROM service_listing WHERE id_service_listing= $1);`,[serviceListingId]);
    if (listingExists.exists) {
        const result = await db.one(
            `INSERT INTO contract (
                service_listing_id_service_listing,
                client_id_client,
                completed_contract,
                units_contract,
                rating_contract
            )
            VALUES ($1, $2, FALSE, $3, NULL)
            RETURNING *;`
            ,[ serviceListingId, clientId, units]);
        console.log('result', result)
        return result
    }
    else {
        return false;
    }
}

const getContracts = async (clientId) => {
    const contracts = await db.manyOrNone(
        `SELECT w.names_worker, w.lastnames_worker, sl.id_service_listing, sl.title_service_listing,
                sl.description_service_listing, sl.unit_service_listing, sl.rating_service_listing,
                sl.price_service_listing, s.name_service, c.completed_contract, c.units_contract,
                c.rating_contract, c.id_contract
        FROM contract c
        JOIN service_listing sl ON c.service_listing_id_service_listing = sl.id_service_listing
        JOIN worker w ON sl.worker_id_worker = w.id_worker
        JOIN service s ON sl.service_id_service = s.id_service
        WHERE c.client_id_client = $1;
        `, [clientId])

    return contracts;
}

module.exports = {startContract, getContracts};