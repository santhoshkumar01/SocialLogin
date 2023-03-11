import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from './SignInScreen'
import Footer from './Footer'
import SplashScreen from './SplashScreen'
import { Provider } from './Context'


//B4:6B:2E:5F:5A:30:C5:E4:E7:12:BB:F0:74:FC:2B:43:64:3A:FC:15 SHA1
const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splashScreen"
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#f4f4f4',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen name="splashScreen" component={SplashScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="footer" component={Footer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => (
  <Provider>
    <App />
  </Provider>
)
