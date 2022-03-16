import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const NoResultsScreen = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/noResult.png")}
      />
      <Text style={styles.topText}>No Result Found</Text>
      <Text style={styles.bottomText}>
        We could not find any places that match your preferences
      </Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>ADJUST FILTERS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoResultsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    width: 150,
    backgroundColor: "#00cc99",
    borderRadius: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  topText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bottomText: {
    marginVertical: 17,
    color: "#696969",
    fontSize: 15,
    width: 200,
  },
  image: {
    width: 300,
    height: 170,
  },
});
