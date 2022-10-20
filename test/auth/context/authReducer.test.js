import { authReducer } from "../../../src/auth/context"
import { types } from "../../../src/auth/"

describe('Pruebas en authReducer', () => { 

    const inicialState = {
        logged: false,
        user: { id: 'ABC', name: 'Marcos'}
    }

    const newUser = {
        id: 'ABCD',
        name: 'Alejandro'
    }

    test('Debe de retornar el estado por defecto', () => { 

        const newState = authReducer( inicialState )
        expect( newState ).toBe( inicialState )

     });

     test('Debe de (login) llamar el login autenticar y establecer el user ', () => {

        const action = { 
            type: types.login,
            payload: newUser
        }

        const newState = authReducer( inicialState, action );

        expect( newState.logged ).toBeTruthy();
        expect( newState.user ).toBe( newUser );

     });

     test('Debe de (logout) borrar el name del usuario y logged en false ', () => {

        const action = { 
            type: types.login,
            payload: newUser
        }

        const newState = authReducer( inicialState, action );

        expect( newState.logged ).toBeTruthy();
        expect( newState.user ).toBe( newUser );

        const action2 = { 
            type: types.logout
        }

        const newState2 = authReducer( newState, action2 );

        expect( newState2.logged ).toBeFalsy();
        expect( newState2.user ).toBeFalsy();

     });


 })