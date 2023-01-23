
const db = require('../db');

const createWorker = async (data) => {
    const {email, names, lastNames, address, phone, password, cc} = data
    const worker = db.one(
        `INSERT INTO worker 
        (email_worker, cc_worker, names_worker, lastnames_worker,  phone_worker, address_worker, available_worker, password_worker)
         VALUES ($1, $2, $3, $4, $5, $6, TRUE, $7) RETURNING *;`,
        [email, names, lastNames,  phone, password, address, cc])
        .then(worker => {return worker})
        .catch(error => {return error.detail});
    return worker
}


const createListing = async (listingBody, userId) => {
    //checks if there is not an existing listing for that user and service
    const {serviceId, unit, price, title, description} = listingBody;
    try {
        const listingExists = await db.one('SELECT EXISTS (SELECT 1 FROM service_listing WHERE worker_id_worker=$1 AND service_id_service=$2);',[userId, serviceId]);
        if (!listingExists.exists){
            return await db.one(
                `INSERT INTO service_listing 
                    (   worker_id_worker, 
                        service_id_service, 
                        rating_service_listing,
                        available_service_listing,
                        price_service_listing,
                        unit_service_listing,
                        title_service_listing,  
                        description_service_listing 
                    ) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                    RETURNING *;`,
                [userId, serviceId, 0, true , price, unit,title, description]);
        }
        else {
            return null
        }     
    }
    catch {
        return {message: "Database error." }
    }


}


module.exports = {
    createListing,
    createWorker
}