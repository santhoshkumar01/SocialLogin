import React, { useEffect, useContext } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context } from './Context'


export default Home = (props) => {
    const { userData, setUserData } = useContext(Context)
    console.log(userData, 'GHOME'.repeat(500))
    const logOut = async () => {
        await AsyncStorage.clear()
        setUserData(null)
        props.navigation.navigate('SignInScreen')
    }
    return (
        <View style={styles.container}>
            {userData?.picture && <Image source={{ uri: userData?.picture }} style={styles.picture} />}
            <Text style={styles.details}>{`Name : ${userData?.given_name} ${userData?.family_name} `}</Text>
            <Text style={styles.details}>{`Email : ${userData?.email} `}</Text>
            <TouchableOpacity onPress={() => logOut()} style={styles.button} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    picture: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: '5%'
    },
    details: {
        fontSize: 20,
        marginTop: '5%',
        fontWeight: 'bold',
    },
    button: {
        height: 60,
        width: '70%',
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '4%',
        marginTop: '20%'
    },
    buttonText: {
        fontSize: 20
    }
})