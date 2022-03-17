import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LocationListScreen = (props) => {
  const { route } = props;
  const locationList = route.params.locationList;

  return (
    <View style={styles.container}>
      <Text>locationlist screen</Text>
    </View>
  );
};

export default LocationListScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
