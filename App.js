import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/AuthenticationScreen/SignupScreen";
import Login from "./screens/AuthenticationScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import InputLocationScreen from "./screens/InputLocationScreen/InputLocationScreen";
import MidpointScreen from "./screens/MidpointScreen/MidpointScreen";
import SplashScreen from "./screens/SplashScreen/SplashScreen";
import { Firebase } from "./screens/database/firebase";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userOption, setUserOption] = useState("Get Random");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [initialRoute, setInitalRoute] = useState("Login");

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (loading) setLoading(false);
    if (user) {
      setInitalRoute("Home");
    }
  };
  React.useEffect(() => {
    const subscriber = Firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen setUserOption={setUserOption} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Midpoint"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <MidpointScreen userOption={userOption} {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Signup"
          component={Signup}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
