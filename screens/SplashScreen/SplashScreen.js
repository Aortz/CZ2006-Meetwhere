// components/login.js
import React from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";

const SplashScreen = (props) => {
  const { message } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require("../AuthenticationScreen/AuthenticationAssets/meetwhere-icon.png")}
      />
      <ActivityIndicator />
      {message && <Text style={styles.text}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // padding: 35,
    // minHeight: 700,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  icon: {
    height: 95,
    width: 325,
  },
  text: {
    fontSize: 15,
  },
});

export default SplashScreen;
