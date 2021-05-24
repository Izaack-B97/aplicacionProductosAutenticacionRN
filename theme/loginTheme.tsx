import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        // alignItems: 'center',
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
        // backgroundColor: 'red'
    },

    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',
    },

    // inputField: {
    //     color:'white',
    //     fontSize: 20,
    //     // paddingBottom: 12,
    // },
    
    inputField: {
        marginTop: 2,
        color:'white',  
        fontSize: 20,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        // paddingBottom: 2
        padding: 5
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },

    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 100
    },

    buttonText: {
        fontSize: 15,
        color: 'white'
    },

    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10
    },

    containerButtonReturn: {
        position: 'absolute',
        left: 20
    },

    buttonReturn: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
 
});