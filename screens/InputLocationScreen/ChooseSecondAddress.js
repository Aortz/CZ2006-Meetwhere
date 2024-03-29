import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const ChooseSecondAddress = (props) => {
  const {
    setStepNumber,
    secondLocation,
    setSecondLocation,
    handleSubmitBothLocations,
    firstLocation,
  } = props;

  const ref = useRef();

  const [error, setError] = useState(null);

  // Restore second address upon going back from filters screen
  useEffect(() => {
    if (secondLocation !== null) {
      const add = secondLocation.description;
      ref.current.setAddressText(add);
    }
  }, []);

  // Function to handle going back to input first address
  const handleGoBackFirst = () => {
    setStepNumber(1);
  };

  // Function to handle submitting both addresses
  const handleNext = () => {
    if (secondLocation === null) {
      return null;
    }

    if (firstLocation.description === secondLocation.description) {
      setError("Both locations cannot be the same!");
      return;
    }

    handleSubmitBothLocations();
    setError(null);
  };

  return (
    <View style={styles.bottomSheet}>
      <View>
        <Text style={styles.title}>Find your midpoint</Text>
      </View>

      <View style={styles.inputView}>
        <Text style={styles.inputTitle}>{`Address 2`}</Text>
        {error && <Text style={styles.error}>{error}</Text>}
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

              setSecondLocation(address);
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
        <TouchableOpacity onPress={handleGoBackFirst} style={styles.buttonBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.buttonNext}>
          <Text style={styles.buttonText}>Lets go!</Text>
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
    backgroundColor: "#026B00",
    borderRadius: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBack: {
    width: "30%",
    backgroundColor: "#cc2114",
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
  error: {
    color: "red",
  },
});

export default ChooseSecondAddress;
