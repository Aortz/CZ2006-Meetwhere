import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    Linking,
  } from "react-native";
  import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
  import { Card, Divider, CheckBox } from "react-native-elements";
  import { useEffect } from "react";


//helper function to remove duplicates from location list
export const removeDuplicate = (array) => {
    array = array.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.place === value.place && t.name === value.name)
    );
    return array;
};

//helper function to convert location list into displayable JSX elements
export const displayArray = (locationlist) => {
    let locationCount = 0;
    let topFive = [];

    while (locationCount < locationlist.length) {
      let locationCountString = locationCount.toString();
      topFive.push(
        <Marker
          key={locationCount}
          identifier={locationCountString}
          coordinate={{
            latitude: locationlist[locationCount].location.latitude,
            longitude: locationlist[locationCount].location.longitude,
          }}
          onPress={(event) => (
            setLocationDetails(parseInt(event.nativeEvent.id)),
            console.log("I pressed", event.nativeEvent.id)
          )}
          image={require('../../assets/club.png')}
        />
      );
      locationCount += 1;
    }

    let topFiveSet = new Set(topFive);
    topFive = Array.from(topFiveSet);
    // const map1 = topFive.map((marker,index) => (index % 2 == 0)?{marker.onPress={}})
    return topFive;
  };

//helper function to pick a random cover image to be displayed from the array of images provided
export const pickRandomImage = (array) => {
    if (array.length == 0) {
      return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg";
    } else {
      const random = Math.floor(Math.random() * array.length);
      return array[random];
    }
  };