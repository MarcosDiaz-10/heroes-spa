import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en AppRouter', () => {

    test('Debe de mostrar el login si no esta autenticado', () => { 

        const contextValue = {
            authState: {logged: false}
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length).toBe(2)

        // screen.debug();

     });

    test('Debe de mostrar el componenete de Marvel si esta autenticado', () => { 

        const contextValue = {
            authState: {logged: true, user: { name: 'Marcos', id: 'ABC'}}
        }

        const { user } = contextValue.authState;

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

      
        expect( screen.getByText('Marcos').innerHTML ).toBe( user.name );

     });

  

 })