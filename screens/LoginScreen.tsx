import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { KeyboardAvoidingView, Text, View, Platform, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm';
import { styles } from '../theme/loginTheme'

interface Props extends StackScreenProps<any,any> {};

export const LoginScreen = ( { navigation } : Props ) => {

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss(); // Oculta el teclado
    };

    return (
        <>
                {/* Background */}
            <Background />
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            >
                <View style={ styles.formContainer }>
                    <WhiteLogo />
                    <Text style={ styles.title } >Login</Text>
                    
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
                        onSubmitEditing={ onLogin }
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
                        onSubmitEditing={ onLogin }
                        autoCapitalize='none'
                        autoCorrect={ false }
                    />

                    {/* Boton login */}
                    <View style={ styles.buttonContainer }>
                        <TouchableOpacity 
                            onPress={ onLogin }
                            activeOpacity={ 0.8 }
                            style={ styles.button }
                        >
                            <Text style={ styles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={ styles.newUserContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('RegisterScreen') }
                        >
                            <Text style={ styles.buttonText } >Nueva cuenta </Text>
                        </TouchableOpacity>
                    </View>

                    {/* KeyboardAvoidingView */}
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
