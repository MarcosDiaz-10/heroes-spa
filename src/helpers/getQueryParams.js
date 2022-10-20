
export const getQueryParams = ( location = {} ) => {
    let query = {};

    const params = new URLSearchParams( location.search );
    for( const [key, value] of params.entries() ){
       query[key] = value
    }

    return query
}
