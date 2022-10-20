import { useReducer } from "react"
import { AuthContext,authReducer  } from "./"
import { types } from "../types/types"



const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user
    }
}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {}, init );



    const onLogin = ( name ) => {

        const user = {
            id: 'abc',
            name
        };

        const action = {
            type: types.login,
            payload: user 
        }
   
        localStorage.setItem('user', JSON.stringify(user));
        
        dispatch(action);
    } 

    const onLogout = () => {
        localStorage.removeItem('user');

        const action = {
            type: types.logout
        }

        dispatch(action);
    }

    return (
            <AuthContext.Provider value={{
                authState,
                login: onLogin,
                logout: onLogout
            }}>
                { children }
            </AuthContext.Provider>
        )
}
