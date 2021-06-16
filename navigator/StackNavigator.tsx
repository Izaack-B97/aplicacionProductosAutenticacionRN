import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { LoadingScreen } from '../screens/LoadingScreen';
import ProductsNavigator from './ProductsNavigator';

const Stack = createStackNavigator();

export const StackNavigator = () => {
    
    const { status } = useContext( AuthContext );


    if ( status === 'checking' ) return <LoadingScreen />;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: '#ffffff'
                }
            }}
        >
            {
                status === 'authenticated'
                    ? (
                        <>
                            <Stack.Screen name="ProductsNavigator" component={ ProductsNavigator } />
                            <Stack.Screen name="ProtectedScreen" component={ ProtectedScreen } />
                        </>
                    )
                    : (
                        <>
                            <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                            <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                        </>
                    )
            }

        </Stack.Navigator>
    )
}
