import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { Context } from './Context'

export default SplashScreen = (props) => {
    const {  setUserData } = useContext(Context)
    useEffect(() => {
        (async () => {
            try {
                const googleToken = await AsyncStorage.getItem("googleToken")
                const data = await AsyncStorage.getItem("userData")
                const googleData = JSON.parse(data)
                if (googleToken && googleData) {
                    // console.log(googleToken, 'GOOGLE TOKEN'.repeat(500))
                    setUserData(googleData)
                    props.navigation.navigate('footer')
                } else {
                    props.navigation.navigate('SignInScreen')
                }
            } catch (error) {

            }
        })()
    }, [])
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: 'bold'
            }}>My App</Text>
        </View>
    )
}