import { render,screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth'
import { PublicRoute } from '../../src/router'

describe('Pruebas a PublicRoute', () => { 

    test('Debe de mostrar el children si no esta autenticado ', () => { 
       
        const contextValue = {
            authState: {logged: false}
        }

        render( 
            <AuthContext.Provider value={ contextValue }> 
               <PublicRoute>
                <h1>Ruta Publica</h1>
               </PublicRoute>
            </AuthContext.Provider> 
        ) 
       
        expect( screen.getByText('Ruta Publica') ).toBeTruthy();

        // screen.debug();

     });

    test('Debe de navegar si esta autenticado', () => { 
       
        const contextValue = {
            authState: {
                logged: true,
                user: { name:'Marcos', id: 'ABC' }
            }
        }

        render( 
            <AuthContext.Provider value={ contextValue }> 
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='marvel' element={ <h1>Pagina Marvel</h1> }/> 
                        <Route path='login' element={ 
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                         }/> 
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider> 
        ) 
       
        expect( screen.getByText('Pagina Marvel')).toBeTruthy();
        
        // screen.debug();

     });


 })