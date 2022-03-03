import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/AuthenticationScreen/SignupScreen";
import Login from "./screens/AuthenticationScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import InputLocationScreen from "./screens/InputLocationScreen/InputLocationScreen";
import MidpointScreen from "./screens/MidpointScreen/MidpointScreen";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import {Firebase} from "./screens/database/firebase";

const Stack = createNativeStackNavigator();
export default function App() {
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState(null)

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (loading) setLoading(false);
  }
  React.useEffect(() => {
    const subscriber = Firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) return <SplashScreen/>;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user? (<Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown: false,
          }} 
        />):(
         <> 
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown: false,
          }} 
        />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen
          name="InputLocation"
          component={InputLocationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Midpoint"
          component={MidpointScreen}
          options={{
            headerShown: false,
          }}
        />
        </>)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
