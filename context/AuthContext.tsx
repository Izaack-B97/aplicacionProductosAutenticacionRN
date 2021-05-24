import React, { createContext, useReducer } from "react";
import cafeApi from "../api/cafeApi";
import { LoginData, LoginResponse, Usuario } from '../interfaces/interfaces';
import { authReducer, Authstate } from "./authReducer";

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    singUp: () => void,
    singIn: ( loginData : LoginData ) => void,
    logOut: () => void,
    removeError: () => void
}

const authInitialState : Authstate = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
};

export const AuthContext = createContext( {} as AuthContextProps );

export const AuthProvider = ( { children } : any ) => {

    const [state, dispatch] = useReducer( authReducer , authInitialState)

    const singIn = async ( { correo, password } : LoginData ) => { 
        try {
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', {
                correo,
                password
            });
            
            dispatch({
                type: 'singUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });
            
        } catch (error) {
            console.log( error.response.data.msg );
            dispatch({ type: 'addError', payload: error.response.data.msg || 'Informacion incorrecta' });
        }
    };
    
    const singUp = () => {  };
    const logOut = () => {  };
    const removeError = () => {  };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                singUp,
                singIn,
                logOut,
                removeError
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}