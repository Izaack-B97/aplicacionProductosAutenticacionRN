import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigator/StackNavigator';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductsContext';

const App = () => {
  return (
    <NavigationContainer>
        <AppState>
          <StackNavigator />
        </AppState> 
    </NavigationContainer>
  );
}

const AppState = ( { children } : any ) => {
  return (
    <AuthProvider>
      <ProductProvider>
        { children }
      </ProductProvider>
    </AuthProvider>
  )
}


export default App;