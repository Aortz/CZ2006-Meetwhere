import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./screens/AuthenticationScreen/SignupScreen";
import Login from "./screens/AuthenticationScreen/LoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen/HistoryScreen";
import RandomLocationScreen from "./screens/RandomLocationScreen/RandomLocationScreen";
import SuggestedLocationScreen from "./screens/SuggestedLocationScreen/SuggestedLocationScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false,}}/> 
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="RandomLocation" component={RandomLocationScreen} />
        <Stack.Screen name="SuggestedLocation" component={SuggestedLocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
