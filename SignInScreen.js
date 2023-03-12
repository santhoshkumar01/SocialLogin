import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from './Context'
import { ToastMessage } from './Utils'

WebBrowser.maybeCompleteAuthSession()

const SignInScreen = (props) => {
  const { setUserData } = useContext(Context)
  const [token, setToken] = useState("")
  const [loader, setLoader] = useState(false)

  const getUserDetails = async () => {
    setLoader(true)
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      console.log(response, 'RES'.repeat(500));
      await AsyncStorage.setItem("userData", JSON.stringify(response))
      const user = await response.json()
      setUserData(user)
      setLoader(false)
      if (user?.given_name) {
        props.navigation.navigate('footer')
      }
    } catch (error) {
      setLoader(false)
      console.log('Error While Google SignIn' + error)
    }
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "609756879314-l7usk29d1br7d6e409tu8r0o9cbpkc7l.apps.googleusercontent.com",
    iosClientId: "609756879314-b8o6lec47j6mqgkgt8menv5hmhv4kn02.apps.googleusercontent.com",
    expoClientId: "609756879314-li7gtloj5c2upithf70r2hveunok0hb9.apps.googleusercontent.com"
  })

  useEffect(() => {
    (async () => {
      if (response?.type === "success") {
        console.log(response.authentication.accessToken, 'token'.repeat(100))
        setToken(response.authentication.accessToken)
        AsyncStorage.setItem("googleToken", JSON.stringify(response.authentication.accessToken))
        getUserDetails()
      } else {
        console.log('Not Getting Access Token')
        return ToastMessage('Something Went Wrong')
      }
    })()
  }, [response, token])


  return (
    <View style={styles.container}>
      <Text style={styles.appName}>My App</Text>
      <Text style={styles.loginText}>Login</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Login With Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => promptAsync()} style={styles.button} activeOpacity={0.7}>
        {loader ? <ActivityIndicator size="small" color="#0000ff" /> : <Text style={styles.buttonText}>Login With Google</Text>}
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  appName: {
    fontSize: 24
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '30%'
  },
  button: {
    height: 60,
    width: '70%',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '4%'
  },
  buttonText: {
    fontSize: 20
  }
})

export default SignInScreen



