import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import SplashScreen from "../SplashScreen/SplashScreen";
import { fetchComplementary } from "./helperFunctions";

const ComplementaryLocations = (props) => {
  const { locationDetail, navigation } = props;
  const [compLocations, setCompLocations] = useState([]);

  useEffect(() => {
    console.log(locationDetail);
    setCompLocations([]);
    const getComplementary = async () => {
      const results = await fetchComplementary(locationDetail);
      for (const doc of results.docs) {
        setCompLocations((prev) => [...prev, doc.data()]);
      }
    };

    getComplementary();
  }, []);

  const handleGetDirections = () => {
    const address = locationDetail.address;
    let string_address;
    if (address.postalCode.length != 0) {
      string_address = escape(`Singapore ${address.postalCode}`);
    } else {
      string_adress = escape(`${address.block} ${address.streetName}`);
    }

    const url = `https://www.google.com/maps/dir/?api=1&destination=${string_address}&travelmode=transit`;

    Linking.openURL(url);
  };

  const handlePress = (loc) => {
    navigation.navigate("LocationDetails", {
      location: loc,
      prevLocation: locationDetail,
    });
  };

  if (compLocations.length == 0) {
    return <SplashScreen />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonDirections}
        onPress={handleGetDirections}
      >
        <Text>Get Directions!</Text>
      </TouchableOpacity>
      <View style={styles.bottomSheet}>
        <Text>You might also want to visit</Text>
        <View style={styles.box}>
          {compLocations.map((loc, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(loc)}>
              <View style={styles.place}>
                <Text>{loc.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ComplementaryLocations;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: 250,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  bottomSheet: {
    height: 230,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  buttonDirections: {
    width: 175,
    backgroundColor: "#95FF9F",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderWidth: 2,
    borderRadius: 9,

    justifyContent: "center",
  },
  place: {
    height: 40,
    borderBottomWidth: 0.5,
    justifyContent: "center",
    paddingLeft: 10,
  },
});
