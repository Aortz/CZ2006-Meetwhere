import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import ChooseFirstAddress from "./ChooseFirstAddress";
import ChooseSecondAddress from "./ChooseSecondAddress";

import * as Location from "expo-location";

const InputLocationScreen = ({ navigation }) => {
  const [currentCoords, setCurrentCoords] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });

  const [stepNumber, setStepNumber] = useState(1);
  const [firstLocation, setFirstLocation] = useState(null);
  const [secondLocation, setSecondLocation] = useState(null);

  // Function to get the current location of the user
  useEffect(() => {
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: currentCoords.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      (error) => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  // Function to calculate midpoint of the two addresses and navigate to midpoint screen
  const handleSubmitBothLocations = () => {
    const mid_lat = (firstLocation.latitude + secondLocation.latitude) / 2;
    const mid_long = (firstLocation.longitude + secondLocation.longitude) / 2;
    navigation.navigate("Midpoint", {
      midpoint: { latitude: mid_lat, longitude: mid_long },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 1.3048,
          longitude: 103.8318,
          // latitude: currentCoords.latitude,
          // longitude: currentCoords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>

      {stepNumber === 1 ? (
        <ChooseFirstAddress
          setStepNumber={setStepNumber}
          firstLocation={firstLocation}
          setFirstLocation={setFirstLocation}
          navigation={navigation}
        />
      ) : (
        <ChooseSecondAddress
          setStepNumber={setStepNumber}
          secondLocation={secondLocation}
          setSecondLocation={setSecondLocation}
          handleSubmitBothLocations={handleSubmitBothLocations}
          firstLocation={firstLocation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default InputLocationScreen;
