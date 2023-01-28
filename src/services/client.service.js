
const db = require('../db');

const startContract = async (clientId, serviceListingId, units) => {
    //1 paso: comprobar si existe servicelisting dado
    const listingExists = await db.one(`SELECT EXISTS (SELECT 1 FROM service_listing WHERE id_service_listing= $1);`,[serviceListingId]);
    if (!listingExists.exist) {const result = await db.one(
    `INSERT INTO contract (
    service_listing_id_service_listing,
    client_id_client,
    completed_contract,
    units_contract,
    rating_contract
    )
    VALUES($1, $2, FALSE, $3, NULL)
    RETURNING *;`
    [clientId, serviceListingId, units]);
    return result
    }
    else {
        return false;
    }
    //2 paso: Si existe serviceListing creamos el contrato

}