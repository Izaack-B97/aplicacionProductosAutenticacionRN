import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useReducer } from "react";
import cafeApi from '../api/cafeApi';
import { LoginData, LoginResponse, Usuario, RegisterData } from '../interfaces/interfaces';
import { authReducer, Authstate } from "./authReducer";

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'checking' | 'authenticated' | 'not-authenticated',
    singUp: ( registerData : RegisterData ) => void,
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

    useEffect(() => {
        verifyToken();
    }, [])

    const verifyToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            // No hay token
            if ( !token ) return dispatch({ type: 'notAuthenticated' });
            // Hay token
            const { status, data } = await cafeApi.get('/auth');
            
            if ( status !== 200 ) {
                return dispatch({ type: 'notAuthenticated' });
            }
            dispatch({
                type: 'singUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

        } catch (error) {
            console.log({ error });
        }
    }

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

            await AsyncStorage.setItem( 'token', data.token );            
        } catch (error) {
            // console.log( error.response.data.msg );
            dispatch({ type: 'addError', payload: error.response.data.msg || 'Informacion incorrecta' });
        }
    };
    
    const singUp = async ( { nombre, correo, password } : RegisterData ) => { 
        try {
            const { data } = await cafeApi.post('/usuarios', { nombre, correo, password });
            
            dispatch({
                type: 'singUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem( 'token', data.token );           
        } catch (error) {
            let errs : string = '';    
            error.response.data.errors.forEach(( err : any ) => {
                errs += err.msg + '\n';
            });
            dispatch({ type: 'addError', payload: errs });
        }
    };

    const logOut = async () => { 
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => { 
        dispatch( { type: 'removeError' } );
    };

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