import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const ChooseFirstAddress = (props) => {
  const { setStepNumber, firstLocation, setFirstLocation, navigation } = props;

  const ref = useRef();

  useEffect(() => {
    if (firstLocation !== null) {
      const add = firstLocation.description;

      ref.current.setAddressText(add);
    }
  }, []);

  const handleNext = () => {
    if (firstLocation === null) {
      return null;
    }
    setStepNumber(2);
  };

  return (
    <View style={styles.bottomSheet}>
      <View>
        <Text style={styles.title}>Find your midpoint</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>{`Address 1`}</Text>
        <View style={{ height: "100%" }}>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
              const address = {
                description: data.description,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              };

              setFirstLocation(address);
            }}
            query={{
              key: "AIzaSyDnVGaAdMCMe2dkvI_vzahNA261VrXlTfU",
              language: "en",
              components: "country:sg",
            }}
            styles={{
              textInput: {
                backgroundColor: "#DCDCDC",
                borderRadius: 10,
              },
            }}
          />
        </View>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.buttonBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.buttonNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "white",
    height: 270,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputView: {
    marginBottom: 20,
    marginTop: 5,
    height: "55%",
  },
  inputTitle: {
    marginBottom: 5,
    borderColor: "red",
  },
  buttonView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  buttonNext: {
    width: "30%",
    backgroundColor: "#009900",
    borderRadius: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBack: {
    width: "30%",
    backgroundColor: "#ff1a1a",
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
});

export default ChooseFirstAddress;
