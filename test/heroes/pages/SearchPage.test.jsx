import {  fireEvent, render, renderHook, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes";
import { useForm } from "../../../src/hooks/useForm";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}})

describe('Pruebas en SearchPage', () => { 

    beforeEach( () => jest.clearAllMocks())

    test('Debe de mostrarse correctamente con valores por defecto', () => { 

        const { container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )
        
        expect( container ).toMatchSnapshot();

     });

    test('Debe de mostrar a batman y el input con el valor del queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        )
        
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman')

        const img = screen.getByRole('img');
        expect( img.src ).toContain('/assets/dc-batman.jpg')
     
        const alertSearchHero = screen.getByLabelText('alertSearchHero');
     
        expect( alertSearchHero.style.display ).toBe('none')
       

     });

    test('Debe de mostrar un error si no se encuentra el hero', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        )
        
        const alertNoFoundHero = screen.getByLabelText('alertNoFoundHero');

        expect( alertNoFoundHero.style.display ).toBeFalsy();

     });

    test('Debe de llamar el navigate a la pantalla nueva', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        )

        expect( screen.getByText('Search a hero'))

        const input = screen.getByRole('textbox');  
        fireEvent.input( input, { target: { value: 'Superman'} })
        const form = screen.getByLabelText('form');
        fireEvent.submit( form )

        expect( mockUseNavigate ).toHaveBeenCalledWith(`?q=${ 'Superman' }`)
        
  
     });






 })