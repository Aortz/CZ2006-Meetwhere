import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LocationDetailsScreen = (props) => {
  if (props.route.params.location === null) {
    return (
      <View style={styles.container}>
        <Text> No Locations Found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>LocationDetailsScreen</Text>
      <Text>{props.route.params.location.name}</Text>
    </View>
  );
};

export default LocationDetailsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
