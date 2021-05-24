import { Usuario } from "../interfaces/interfaces";

export interface Authstate {
    status: 'checking' | 'authenticated' | 'not-authenticated',
    token: string | null,
    errorMessage: string,
    user: Usuario | null
}

type AuthAction = 
    | { type: 'singUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' };

export const authReducer = ( state : Authstate, action : AuthAction ) : Authstate => {

    switch ( action.type ) {
        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                status: 'not-authenticated',
                token: null,
                user: null
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        case 'singUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user
            }
        case 'logout':
        case 'notAuthenticated': 
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
            }
        default:
            return state;
    }
};