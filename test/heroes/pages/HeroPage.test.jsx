import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom"
import { HeroPage } from "../../../src/heroes"
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    return{
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockUseNavigate
    }
})

describe('Pruebas HeroPage', () => { 

    test('debe mostrar el componente por defecto cuando existe el hero', () => { 

        const { container } = render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="hero/:id" element={ <HeroPage/>}/>
                    <Route path="marvel" element={ <h1>Marvel</h1> }/>
                </Routes>             
            </MemoryRouter>
        )
        
        expect( container ).toMatchSnapshot();
        

     })

    test('debe mostrar la imagen cuando el hero existe', () => { 

        render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="hero/:id" element={ <HeroPage/>}/>
                    <Route path="marvel" element={ <h1>Marvel</h1> }/>
                </Routes>             
            </MemoryRouter>
        )
        
        const img = screen.getByRole('img');
        expect( img.src ).toContain('marvel-spider')
        
     })

    test('debe navegar a marvel cuando no hay hero', () => { 

        render(
            <MemoryRouter initialEntries={['/hero/marvel-spider2']}>
                <Routes>
                    <Route path="hero/:id" element={ <HeroPage/>}/>
                    <Route path="marvel" element={ <h1>Marvel</h1> }/>
                </Routes>             
            </MemoryRouter>
        )
        
        const marvelPage = screen.getByText('Marvel');
        expect( marvelPage ).toBeTruthy();
        

     })

    test('debe llamar la funcion de navegar al presionar el boton de regresar', () => { 

        render(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="hero/:id" element={ <HeroPage/>}/>
                    <Route path="marvel" element={ <h1>Marvel</h1> }/>
                </Routes>             
            </MemoryRouter>
        )
        
        
        const btnRegresar = screen.getByRole('button');
        fireEvent.click( btnRegresar );

        expect( mockUseNavigate ).toHaveBeenCalledWith(-1);

     })
 })