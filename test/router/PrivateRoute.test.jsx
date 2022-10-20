import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router";

describe('Pruebas en PrivateRoute', () => { 

    test('Debe de mostrar el children si esta autenticado ', () => { 


        Storage.prototype.setItem = jest.fn();

       
        const contextValue = {
            authState: {logged: true, user: {name: 'Marcos', id: 'ABC'}},
        }

        render( 
            <AuthContext.Provider value={ contextValue }> 
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider> 
        ) 
       
        expect( screen.getByText('Ruta Privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

        // screen.debug();

     });

    test('Debe de navegar si no esta autenticado', () => { 
       
        const contextValue = {
            authState: {
                logged:false,
                
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }> 
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route path='login' element={ <h1>Pagina Login</h1> }/> 
                        <Route path='marvel' element={ 
                            <PrivateRoute>
                                <h1>Pagina Marvel</h1>
                            </PrivateRoute>
                         }/> 
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider> 
        ) 
       
        expect( screen.getByText('Pagina Login')).toBeTruthy();
        
        // screen.debug();

     });

     

 })