import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WhiteLogo } from '../components/WhiteLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { styles } from '../theme/loginTheme';
import { RegisterData } from '../interfaces/interfaces';


interface Props extends StackScreenProps<any,any> {};

export const RegisterScreen = ( { navigation } : Props ) => {

    const { singUp, errorMessage, removeError } = useContext( AuthContext );

    const { name, email, password, onChange } = useForm({
        name: '',
        email: '',
        password: ''
    });
    const { top } = useSafeAreaInsets();

    useEffect(() => {
        if ( errorMessage.length !== 0 ) {
            Alert.alert(
                'Problemas al registrar',
                errorMessage,
                [
                    { text: 'OK', onPress: () => removeError() }
                ]
            )
        }
    }, [ errorMessage ]);


    const onRegister = () => {
        const data : RegisterData = {
            nombre: name,
            correo: email,
            password
        }
        Keyboard.dismiss(); // Oculta el teclado
        singUp( data )
    };

    return (
        <>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: '#5856D6'
                }}
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            >  
                <View style={ styles.formContainer }>
                    <WhiteLogo />
                    <Text style={ styles.title } >Registro</Text>
                    
                    <Text style={ styles.label } >Nombre:</Text>
                    <TextInput 
                        placeholder='Ingrese su nombre'
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType='default'
                        // underlineColorAndroid='white'
                        selectionColor= 'black'
                        style={[
                            styles.inputField,
                        ]}
                        onChangeText={ ( value ) => onChange( value, 'name' ) }
                        value={ name }
                        onSubmitEditing={ onRegister }
                        autoCapitalize='words'
                        autoCorrect={ false }
                    />

                    <Text style={ styles.label } >Email:</Text>
                    <TextInput 
                        placeholder='Ingrese su email'
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType='email-address'
                        // underlineColorAndroid='white'
                        selectionColor= 'black'
                        style={[
                            styles.inputField,
                        ]}
                        onChangeText={ ( value ) => onChange( value, 'email' ) }
                        value={ email }
                        onSubmitEditing={ onRegister }
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />

                    <Text style={ styles.label } >Contraseña:</Text>
                    <TextInput 
                        placeholder='***************'
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        // underlineColorAndroid='white'
                        selectionColor= 'black'
                        style={[
                            styles.inputField
                        ]}
                        secureTextEntry
                        onChangeText={ ( value ) => onChange( value, 'password' ) }
                        value={ password }
                        onSubmitEditing={ onRegister }
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />

                    {/* Boton Registrar */}
                    <View style={ styles.buttonContainer }>
                        <TouchableOpacity 
                            onPress={ onRegister }
                            activeOpacity={ 0.8 }
                            style={ styles.button }
                        >
                            <Text style={ styles.buttonText }>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>
                    <View 
                        style={{
                            ...styles.containerButtonReturn,
                            top: top + 20,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LoginScreen') }        
                            activeOpacity={ 0.8 }
                            style={ styles.buttonReturn }
                        >
                                <Text style={ styles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    </View> 
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
