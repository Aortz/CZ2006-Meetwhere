import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { convertFilters, getRandomLocation } from "./helperFunctions";
import { CheckBox, Icon, Slider } from "react-native-elements";

const Filter = (props) => {
  const {
    setShowFilter,
    setShowSecUserInput,
    userOption,
    navigation,
    overallFilter,
    setOverallFilter,
    userDetails,
    setShowRadius,
  } = props;

  const [checkBoxes, setCheckBoxes] = useState({
    Food: false,
    Attractions: false,
    "Bars & Clubs": false,
    Cafe: false,
    "Hawker Centres": false,
    Restaurants: false,
    Adventure: false,
    Arts: false,
    "History & Culture": false,
    "Nature & Wildlife": false,
    "Leisure & Recreation": false,
    Bars: false,
    Clubs: false,
    maxPrice: 0,
  });

  const handleFinishFilters = async () => {
    const temp_filters = overallFilter;
    const temp_checkBox = checkBoxes;

    const new_filters = convertFilters(temp_filters, temp_checkBox);
    console.log(new_filters);
    setOverallFilter(new_filters);

    if (userOption == "Get Random") {
      const locationDetails = await getRandomLocation(
        overallFilter,
        userDetails
      );
      navigation.navigate("LocationDetails", { location: locationDetails });
    }
  };

  const handleGoBack = () => {
    if (userOption === "Get Random") {
      setShowFilter(false);
      setShowSecUserInput(true);
      setShowRadius(true);
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.filterContainer}>
      <View style={styles.topLayer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.button}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleFinishFilters()}
        >
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

        {/* <Text style={styles.titleFilter}>Price Range</Text>
        <View style={styles.priceSlider}>
          <Text>{`Max Price: $${checkBoxes["maxPrice"]}`}</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={checkBoxes["maxPrice"]}
            onValueChange={(value) => {
              setCheckBoxes({ ...checkBoxes, maxPrice: value });
            }}
            step={1}
            allowTouchTrack
            style={{ width: "80%" }}
            trackStyle={{ height: 5 }}
            thumbStyle={{
              height: 10,
              width: 10,
              backgroundColor: "red",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="circle-thin"
                  type="font-awesome"
                  size={10}
                  reverse
                  containerStyle={{ bottom: 15, right: 20 }}
                  color="grey"
                />
              ),
            }}
            maximumTrackTintColor={"white"}
            minimumTrackTintColor={"red"}
          />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: "white",
    height: "55%",
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
});
