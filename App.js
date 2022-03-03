import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/AuthenticationScreen/SignupScreen";
import Login from "./screens/AuthenticationScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import InputLocationScreen from "./screens/InputLocationScreen/InputLocationScreen";
import MidpointScreen from "./screens/MidpointScreen/MidpointScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userOption, setUserOption] = useState("Get Random");

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home">
          {(props) => <HomeScreen setUserOption={setUserOption} {...props} />}
        </Stack.Screen>

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
