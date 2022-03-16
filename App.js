import React, { useState, useEffect } from "react";
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
import LocationDetailsScreen from "./screens/LocationDetailsScreen/LocationDetailsScreen";
import NoResultsScreen from "./screens/NoResultsScreen/NoResultsScreen";
import LocationListScreen from "./screens/LocationListScreen/LocationListScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userOption, setUserOption] = useState("Get Random");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [initialRoute, setInitalRoute] = useState("Login");
  const [totalLocationList, setTotalLocationList] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (loading) setLoading(false);
    if (user) {
      setInitalRoute("Home");
    }
  };
  useEffect(() => {
    const subscriber = Firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) return <SplashScreen message={null} />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Home" options={{headerShown:false}}>
          {(props) => (
            <HomeScreen
              setUserOption={setUserOption}
              userDetails={userDetails}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <Login setUserDetails={setUserDetails} {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="Midpoint"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <MidpointScreen
              userOption={userOption}
              userDetails={userDetails}
              setTotalLocationList={setTotalLocationList}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="History">
          {(props) => <HistoryScreen userDetails={userDetails} {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name="InputLocation"
          component={InputLocationScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="LocationDetails"
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <LocationDetailsScreen
              userDetails={userDetails}
              totalLocationList={totalLocationList}
              setTotalLocationList={setTotalLocationList}
              {...props}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="NoResults"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <NoResultsScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="LocationList"
          options={{
            headerShown: false,
          }}
        >
          {(props) => <LocationListScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
