import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}})



describe('Pruebas en Navbar', () => {
    
    const contextValue = {
        logout: jest.fn(),
        logged: true,
        authState: { user: { name: 'Marcos', id: 'ABC' }}
    }
    
    beforeEach( () => jest.clearAllMocks())

    test('Debe de mostrar el nombre de usuario', () => { 


        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        
        // screen.debug();
        const nameUser = screen.getByText('Marcos');
        const { user } = contextValue.authState;
        expect( nameUser.innerHTML ).toBe( user.name );


     });

    test('Debe de llamar a la funcion logout y el navigate', () => { 
        render(
            <MemoryRouter>
                <AuthContext.Provider value={ contextValue }>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        )
        
        const btnLogout = screen.getByText('Logout')

        fireEvent.click( btnLogout );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockUseNavigate ).toHaveBeenCalledWith('/login', { replace: true })

        // screen.debug();

     });
 })