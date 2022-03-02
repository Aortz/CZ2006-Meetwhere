import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SuggestedLocationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Suggested Locations</Text>
    </View>
  );
};

export default SuggestedLocationsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  historyText: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    textAlign: 'center',
    bottom: 100,
    color: 'blue',
  }
});
