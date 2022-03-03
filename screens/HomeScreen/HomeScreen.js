import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const HomeScreen = ({ route, navigation, setUserOption }) => {
  const { itemId, otherParam } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Text style={styles.header}>Welcome to {route.params}!</Text>
        <View style={styles.iconsview}>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => navigation.navigate("InputLocation")}
          >
            <Image
              source={require("../../assets/random_location.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => navigation.navigate("InputLocation")}
          >
            <Image
              source={require("../../assets/suggested_list.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => navigation.navigate("History")}
          >
            <Image
              source={require("../../assets/history.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 5,
    backgroundColor: "#fff",
    alignItems: "center",

  },
  icon: {
    height: 80,
    width: 80,
  
  },
  icons: {
    flexDirection: "column",
    height: 800,
    borderWidth: 2,
    width: "95%",
  },
  header: {
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    color: "black",
    
  },
  iconsview: {
    flexDirection: "row",
    justifyContent: "space-between",
    height:"100%",
    width: "100%",
    alignContent: "center",
  },
  touchableStyle: {
    height: "90%",
    justifyContent: "center",
  },
});
