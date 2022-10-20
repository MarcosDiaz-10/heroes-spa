import { useLocation } from "react-router-dom";

import { getQueryParams } from "../../helpers";
import { getHeroesByName } from "../";

export const useSearch = () => {
    const location = useLocation();

    const { q = '' } =  getQueryParams( location );
    const heroes = getHeroesByName( q )
  
    const showSearch = ( q.length === 0);
    const showError= ( q.length > 0) && heroes.length === 0;
 
 
    return {
        heroes,
        q,
        showError,
        showSearch
     } 
}
