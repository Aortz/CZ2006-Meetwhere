import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { convertFilters, getLocations } from "./helperFunctions";
import { CheckBox } from "react-native-elements";

const { width, height } = Dimensions.get("screen");

const Filter = (props) => {
  const {
    setShowFilter,
    setShowSecUserInput,
    userOption,
    navigation,
    overallFilter,
    setOverallFilter,
    userDetails,
    setTotalLocationList,
    setLoading,
    checkBoxes,
    setCheckBoxes,
  } = props;

  const handleFinishFilters = async () => {
    setLoading(true);
    const temp_filters = overallFilter;
    const temp_checkBox = checkBoxes;

    const new_filters = convertFilters(temp_filters, temp_checkBox);

    setOverallFilter(new_filters);

    const locationsList = await getLocations(overallFilter, userDetails);

    if (userOption === "Get Random") {
      let randomLocation = null;
      if (locationsList.length != 0) {
        const randomIndex = Math.floor(Math.random() * locationsList.length);
        randomLocation = locationsList[randomIndex];
        locationsList.splice(randomIndex, 1);
      }

      setTotalLocationList(locationsList);

      if (randomLocation === null) {
        navigation.navigate("NoResults");
      } else {
        navigation.navigate("LocationDetails", { location: randomLocation });
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      let locations = [];
      if (locationsList.length <= 5) {
        locations = locationsList;
      } else {
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * locationsList.length);
          const randomLoc = locationsList[randomIndex];
          locations.push(randomLoc);
          locationsList.splice(randomIndex, 1);
        }
      }

      setTotalLocationList(locationsList);

      if (locations.length === 0) {
        navigation.navigate("NoResults");
      } else {
        navigation.navigate("LocationList", { locationList: locations, midpoint: overallFilter.midPoint });
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleGoBack = () => {
    if (userOption === "Get Random") {
      setShowFilter(false);
      setShowSecUserInput(true);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.filterContainer]}>
      <View style={styles.topLayer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.button}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity style={styles.button} onPress={handleFinishFilters}>
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.filterScroll}>
        <Text style={styles.titleFilter}>Destination Type</Text>
        <View style={styles.checkboxView}>
          <Text>Attractions</Text>
          <CheckBox
            checked={checkBoxes["Attractions"]}
            onPress={() => {
              setCheckBoxes((prevState) => ({
                ...prevState,
                Attractions: !prevState["Attractions"],
              }));
            }}
          />
        </View>
        <View style={styles.checkboxView}>
          <Text>Food</Text>
          <CheckBox
            checked={checkBoxes["Food"]}
            onPress={() => {
              setCheckBoxes((prevState) => ({
                ...prevState,
                Food: !prevState["Food"],
              }));
            }}
          />
        </View>

        <View style={styles.checkboxView}>
          <Text>Bars and Clubs</Text>
          <CheckBox
            checked={checkBoxes["Bars & Clubs"]}
            onPress={() => {
              setCheckBoxes((prevState) => ({
                ...prevState,
                "Bars & Clubs": !prevState["Bars & Clubs"],
              }));
            }}
          />
        </View>

        {checkBoxes["Attractions"] && (
          <>
            <Text style={styles.titleFilter}>Attraction Type</Text>
            <View style={styles.checkboxView}>
              <Text>Adventure</Text>
              <CheckBox
                checked={checkBoxes["Adventure"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    Adventure: !prevState["Adventure"],
                  }));
                }}
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Arts</Text>
              <CheckBox
                checked={checkBoxes["Arts"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    Arts: !prevState["Arts"],
                  }));
                }}
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Nature and Wildlife</Text>
              <CheckBox
                checked={checkBoxes["Nature & Wildlife"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    "Nature & Wildlife": !prevState["Nature & Wildlife"],
                  }));
                }}
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Leisure and Recreation</Text>
              <CheckBox
                checked={checkBoxes["Leisure & Recreation"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    "Leisure & Recreation": !prevState["Leisure & Recreation"],
                  }));
                }}
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>History and Culture</Text>
              <CheckBox
                checked={checkBoxes["History & Culture"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    "History & Culture": !prevState["History & Culture"],
                  }));
                }}
              />
            </View>
          </>
        )}

        {checkBoxes["Food"] && (
          <>
            <Text style={styles.titleFilter}>Food Type</Text>
            <View style={styles.checkboxView}>
              <Text>Cafe</Text>
              <CheckBox
                checked={checkBoxes["Cafe"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    Cafe: !prevState["Cafe"],
                  }));
                }}
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Restaurants</Text>
              <CheckBox
                checked={checkBoxes["Restaurants"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    Restaurants: !prevState["Restaurants"],
                  }));
                }}
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Hawker Centres</Text>
              <CheckBox
                checked={checkBoxes["Hawker Centres"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    "Hawker Centres": !prevState["Hawker Centres"],
                  }));
                }}
              />
            </View>
          </>
        )}

        {checkBoxes["Bars & Clubs"] && (
          <>
            <Text style={styles.titleFilter}>Bars and Clubs Type</Text>
            <View style={styles.checkboxView}>
              <Text>Bars</Text>
              <CheckBox
                checked={checkBoxes["Bars"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    Bars: !prevState["Bars"],
                  }));
                }}
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Clubs</Text>
              <CheckBox
                checked={checkBoxes["Clubs"]}
                onPress={() => {
                  setCheckBoxes((prevState) => ({
                    ...prevState,
                    Clubs: !prevState["Clubs"],
                  }));
                }}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: "white",
    height: height / 2.2,
    // alignItems: "center",
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#707070",
  },
  topLayer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
  },
  filterScroll: {
    flex: 1,
    backgroundColor: "#FFF8DC",
    borderRadius: 20,
    paddingLeft: 15,
    paddingTop: 10,
    marginHorizontal: 10,
  },
  checkboxView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  titleFilter: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  priceSlider: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  grabber: {
    width: 60,
    borderTopWidth: 5,
    borderTopColor: "#aaa",
  },
});
