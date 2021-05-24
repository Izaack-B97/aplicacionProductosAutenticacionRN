import React from 'react'
import { View } from 'react-native';

export const Background = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                top: -250,
                backgroundColor: '#5856D6',
                width: 1000,
                height: 1200,
                transform: [
                    { rotate: '-70deg' }
                ]
            }}
        />
    )
}
