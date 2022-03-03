import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Swiper from "react-native-swiper";
import { CheckBox, Icon } from "react-native-elements";

const FilterSwiper = () => {
  const [checkBoxes, setCheckBoxes] = useState({
    Food: false,
    Attractions: false,
    "Bars and Clubs": false,
    Cafe: false,
    "Hawker Center": false,
    Restaurants: false,
    Adventures: false,
    Arts: false,
    "History and Culture": false,
    "Nature and Wildlife": false,
  });

  return (
    <>
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.slide}>
          <Text style={styles.title}>Destination Type</Text>
          <View>
            <View style={styles.checkboxView}>
              <Text>Food</Text>
              <CheckBox
                checked={checkBoxes["Food"]}
                onPress={() =>
                  setCheckBoxes({ ...checkBoxes, Food: !checkBoxes["Food"] })
                }
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Attractions</Text>
              <CheckBox
                checked={checkBoxes["Attractions"]}
                onPress={() =>
                  setCheckBoxes({
                    ...checkBoxes,
                    Attractions: !checkBoxes["Attractions"],
                  })
                }
              />
            </View>
            <View style={styles.checkboxView}>
              <Text>Bars and Clubs</Text>
              <CheckBox
                checked={checkBoxes["Bars and Clubs"]}
                onPress={() =>
                  setCheckBoxes({
                    ...checkBoxes,
                    "Bars and Clubs": !checkBoxes["Bars and Clubs"],
                  })
                }
              />
            </View>
          </View>
        </View>

        <View style={styles.slide}>
          <Text style={styles.title}>Price</Text>
        </View>

        {checkBoxes["Food"] && (
          <View style={styles.slide}>
            <Text style={styles.title}>Type of Food</Text>
            <View>
              <View style={styles.checkboxView}>
                <Text>Cafe</Text>
                <CheckBox
                  checked={checkBoxes["Cafe"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      Cafe: !checkBoxes["Cafe"],
                    })
                  }
                />
              </View>

              <View style={styles.checkboxView}>
                <Text>Hawker Center</Text>
                <CheckBox
                  checked={checkBoxes["Hawker Center"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      "Hawker Center": !checkBoxes["Hawker Center"],
                    })
                  }
                />
              </View>

              <View style={styles.checkboxView}>
                <Text>Restaurants</Text>
                <CheckBox
                  checked={checkBoxes["Restaurants"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      Restaurants: !checkBoxes["Restaurants"],
                    })
                  }
                />
              </View>
            </View>
          </View>
        )}

        {checkBoxes["Attractions"] && (
          <View style={styles.slide}>
            <Text style={styles.title}>Type of Attraction</Text>
            <View>
              <View style={styles.checkboxView}>
                <Text>Adventure</Text>
                <CheckBox
                  checked={checkBoxes["Adventure"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      Adventure: !checkBoxes["Adventure"],
                    })
                  }
                />
              </View>
              <View style={styles.checkboxView}>
                <Text>Arts</Text>
                <CheckBox
                  checked={checkBoxes["Arts"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      Arts: !checkBoxes["Arts"],
                    })
                  }
                />
              </View>
              <View style={styles.checkboxView}>
                <Text>History and Culture</Text>
                <CheckBox
                  checked={checkBoxes["History and Culture"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      "History and Culture": !checkBoxes["History and Culture"],
                    })
                  }
                />
              </View>
              <View style={styles.checkboxView}>
                <Text>Nature and Wildlife</Text>
                <CheckBox
                  checked={checkBoxes["Nature and Wildlife"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      "Nature and Wildlife": !checkBoxes["Nature and Wildlife"],
                    })
                  }
                />
              </View>
            </View>
          </View>
        )}

        {checkBoxes["Bars and Clubs"] && (
          <View style={styles.slide}>
            <Text style={styles.title}>Type of Bars and Clubs</Text>
            <View>
              <View style={styles.checkboxView}>
                <Text>Bars</Text>
                <CheckBox
                  checked={checkBoxes["Bars"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      Bars: !checkBoxes["Bars"],
                    })
                  }
                />
              </View>
              <View style={styles.checkboxView}>
                <Text>Clubs</Text>
                <CheckBox
                  checked={checkBoxes["Clubs"]}
                  onPress={() =>
                    setCheckBoxes({
                      ...checkBoxes,
                      Clubs: !checkBoxes["Clubs"],
                    })
                  }
                />
              </View>
            </View>
          </View>
        )}
      </Swiper>
    </>
  );
};

export default FilterSwiper;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "#FFF8DC",
    borderRadius: 20,
    paddingLeft: 15,
    paddingTop: 10,
    marginHorizontal: 10,
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  checkboxView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
