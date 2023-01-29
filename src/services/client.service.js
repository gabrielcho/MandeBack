
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

module.exports = {startContract};