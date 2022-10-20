import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth"

export const PublicRoute = ({children}) => {
    
    const { authState} = useContext( AuthContext );
    const { logged } = authState;

  return ( logged ) ? <Navigate to="/marvel"/> : children 
}
