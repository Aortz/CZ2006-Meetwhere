import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
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

  // Function to get locations available based on filters and redirects to different screens based on the option chosen
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
      var i = 0;
      while (i < locations.length) {
        i += 1;
      }

      if (locations.length === 0) {
        navigation.navigate("NoResults");
      } else {
        navigation.navigate("LocationList", {
          locationList: locations,
          overallFilter: overallFilter,
        });
      }

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  // Function to handle going back to previous step
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
        {/* <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text>Back</Text>
        </TouchableOpacity> */}
        <Image style={styles.filterIcon} source={require("../../assets/filter.png")} />
        <Text style={styles.title}>Filters</Text>
      </View>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}
      />

      <ScrollView style={styles.filterScroll}>
        <View>
          <Text style={styles.filterHeader}>Destination Type</Text>
        </View>
        <View style={styles.checkboxView}>
          <Image style={styles.locationIcon} source={require("../../assets/attractions.png")} />
          <Text>Attractions</Text>
          <CheckBox
            checked={checkBoxes["Attractions"]}
            onPress={() => {
              setCheckBoxes((prevState) => ({
                ...prevState,
                Attractions: !prevState["Attractions"],
                Adventure: false,
                Arts: false,
                "History & Culture": false,
                "Nature & Wildlife": false,
                "Leisure & Recreation": false,
              }));
            }}
          />
        </View>
        <View style={styles.checkboxView}>
          <Image style={styles.locationIcon} source={require("../../assets/food.png")} />
          <Text>Food</Text>
          <CheckBox
            checked={checkBoxes["Food"]}
            onPress={() => {
              setCheckBoxes((prevState) => ({
                ...prevState,
                Food: !prevState["Food"],
                Cafe: false,
                "Hawker Centres": false,
                Restaurants: false,
              }));
            }}
          />
        </View>

        <View style={styles.checkboxView}>
          <Image style={styles.locationIcon} source={require("../../assets/bars.png")} />
          <Text>Bars and Clubs</Text>
          <CheckBox
            checked={checkBoxes["Bars & Clubs"]}
            onPress={() => {
              setCheckBoxes((prevState) => ({
                ...prevState,
                "Bars & Clubs": !prevState["Bars & Clubs"],
                Bars: false,
                Clubs: false,
              }));
            }}
          />
        </View>

        {checkBoxes["Attractions"] && (
          <>
            <Text style={styles.filterHeader}>Attraction Type</Text>
            <View style={styles.checkboxView}>
              <Image style={styles.locationIcon} source={require("../../assets/adventure.png")} />
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
              <Image style={styles.locationIcon} source={require("../../assets/arts.png")} />
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
              <Image style={styles.locationIcon} source={require("../../assets/natureIcon.png")} />
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
              <Image style={styles.locationIcon} source={require("../../assets/leisure.png")} />
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
              <Image style={styles.locationIcon} source={require("../../assets/historyIcon.png")} />
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
            <Text style={styles.filterHeader}>Food Type</Text>
            <View style={styles.checkboxView}>
              <Image style={styles.locationIcon} source={require("../../assets/cafe.png")} />
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
              <Image style={styles.locationIcon} source={require("../../assets/restaurant.png")} />
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
              <Image style={styles.locationIcon} source={require("../../assets/hawker.png")} />
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
            <Text style={styles.filterHeader}>Bars and Clubs Type</Text>
            <View style={styles.checkboxView}>
              <Image style={styles.locationIcon} source={require("../../assets/cocktail.png")} />
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
              <Image style={styles.locationIcon} source={require("../../assets/club.png")} />
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

      <TouchableOpacity style={styles.goButton} onPress={handleFinishFilters}>
          <Text style ={styles.goText}>Let's Go!</Text>
        </TouchableOpacity>
        
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: "white",
    height: height / 2,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: "#707070",
  },
  topLayer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingTop: 10,
    fontStyle: 'normal',
    //fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },
  filterScroll: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 10,
    paddingTop: 10,
    marginHorizontal: 10,
  },
  checkboxView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  filterHeader: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth:0.5,
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

  locationIcon: {
    //justifyContent: "flex-start",
    height: 25,
    width: 25,
    marginHorizontal: 10,
  },

  filterIcon: {
    //justifyContent: "flex-start",
    marginTop: 10,
    height: 25,
    width: 25,
    marginHorizontal: 10,
  },

  categoryIcon: {
    margin: 10,
    marginTop: 10,
    height: 25,
    width: 25,
    marginHorizontal: 10,
  },


  goButton: {
    width: "5%",
    length: "5%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: "12%",
    justifyContent: "center",
    alignItems: "center",
  },

  goButton: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#026B00",
    borderRadius: 10,
    height: "12%",
    justifyContent: "center",
    alignItems: "center",
  },

  goText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  }
});
