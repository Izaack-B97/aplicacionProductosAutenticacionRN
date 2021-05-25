import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const { user, token, logOut } = useContext( AuthContext );

    // console.log( user )

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>ProtectedScreen</Text>   
            <Button title='Logout' color="#5856D6" onPress={ logOut }></Button>
            <Text>{ JSON.stringify( user, null, 3 ) }</Text>
            <Text>{ token }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    }    
});
