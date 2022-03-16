import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";

import React, { useState } from "react";

const { width, height } = Dimensions.get("screen");

const LocationListScreen = (props) => {
  const { route, totalLocationList, setTotalLocationList } = props;
  const locationList = route.params.locationList
  const overallFilter = route.params.overallFilter
  const [locationDetails, setLocationDetails] = useState(false)
  const midPoint= overallFilter.midPoint;
  console.log("Length of array:", locationList.length);
  console.log(locationList[0]);
  const displayArray = (locationlist) =>{
    var locationCount = 0
    var topFive = []
    console.log(locationList[0].images[0])
    while(locationCount < locationlist.length){
        topFive.push(
        <Marker
          coordinate={{
            latitude: locationlist[locationCount].location.latitude,
            longitude: locationlist[locationCount].location.longitude,
          }}
        />,
        <Circle
          key={locationlist[locationCount].location.latitude + locationlist[locationCount].location.longitude}
          center={{
            latitude: locationlist[locationCount].location.latitude,
            longitude: locationlist[locationCount].location.longitude,
          }}
          radius={100}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
        )
        locationCount += 1
      }
    return topFive;
  }
  return (
    <View style={styles.container}>
      <Text>Location List screen</Text>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: midPoint.latitude - 0.015,
          longitude: midPoint.longitude,
          // latitude: locationList[0].location.latitude,
          // longitude: locationList[0].location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {displayArray(locationList)}
        
      </MapView>
      <View style={[styles.filterContainer]}>
        <Image 
            style={styles.icon}
            source={locationList[0].images[0]}
            PlaceholderContent={<ActivityIndicator color={'#000000'}/>}
        />
        <View>
          <Text style={styles.locationTextStyle}>
            Location: {locationList[0].name}
          </Text>
          <Text style={styles.locationTextStyle}>
            Ratings: {locationList[0].rating}
          </Text>
        </View>
      </View>
      
      
    </View>
  );
};

export default LocationListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  slider: {
    alignItems: "center",
  },
  radiusText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textView: {
    backgroundColor: "white",
  },
  filterContainer: {
    flex: 0.5,
    backgroundColor: "white",
    height: height / 2.2,
    // alignItems: "center",
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#707070",
  },
  icon:{
    borderRadius: 5,
    // resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%', 
    height: "85%",
    aspectRatio: 1
  },
  locationTextStyle: {
    fontSize: 14,
    textAlign: "center", 
    alignSelf: "stretch",
    color: "#000000"
  },
});
