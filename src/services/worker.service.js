
const createListing = async (listingBody) => {
    if(listingBody){
        return {message: "Se ha creado exitosamente el anuncio de labor"}
    }
    return listingBody
}

module.exports = {
    createListing
}