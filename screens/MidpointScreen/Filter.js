import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import FilterSwiper from "./FilterSwiper";

const Filter = (props) => {
  const { setShowFilter, setShowSecUserInput, userOption, navigation } = props;

  const handleGoBack = () => {
    if (userOption === "Get Random") {
      setShowFilter(false);
      setShowSecUserInput(true);
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
        <TouchableOpacity style={styles.button}>
          <Text>Finish</Text>
        </TouchableOpacity>
      </View>

      <FilterSwiper />
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
});
