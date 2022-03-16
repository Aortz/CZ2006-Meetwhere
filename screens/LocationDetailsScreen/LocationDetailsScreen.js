import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LocationDetailsScreen = (props) => {
  const { totalLocationList, setTotalLocationList } = props;
  const locationDetail = props.route.params.location;

  if (locationDetail === null) {
    return null;
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
