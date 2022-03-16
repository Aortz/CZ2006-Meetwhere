import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import React, { useState } from "react";

const LocationListScreen = (props) => {
  const { route, totalLocationList, setTotalLocationList } = props;
  const locationList = route.params.locationList;
  const [locationDetails, setLocationDetails] = useState(false)
  const midPoint= {
    latitude: 1.3048,
    longitude: 103.8318,
  }
  console.log("Length of array:", locationList.length);
  const displayArray = (locationlist) =>{
    var locationCount = 0
    var topFive = []
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
          // latitude: midPoint.latitude,
          // longitude: midPoint.longitude,
          //-0.02
          latitude: midPoint.latitude - 0.015,
          longitude: midPoint.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {displayArray(locationList)}
        
      </MapView>
      {locationDetails && (
        <SetLocationDetail
          setShowFilter={setShowFilter}
          setShowSecUserInput={setShowSecUserInput}
          overallFilter={overallFilter}
          setOverallFilter={setOverallFilter}
          userOption={userOption}
          navigation={navigation}
          userDetails={userDetails}
          setTotalLocationList={setTotalLocationList}
          setLoading={setLoading}
          checkBoxes={checkBoxes}
          setCheckBoxes={setCheckBoxes}
        />
      )}
      
      
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
});
