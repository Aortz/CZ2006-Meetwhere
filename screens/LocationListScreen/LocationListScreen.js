import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import { Card,Divider } from "react-native-elements";

import React, { useState } from "react";

const { width, height } = Dimensions.get("screen");

const LocationListScreen = (props) => {
  const { route, totalLocationList, setTotalLocationList } = props;
  const locationList = route.params.locationList
  const overallFilter = route.params.overallFilter
  const [locationDetails, setLocationDetails] = useState(0)
  // console.log(overallFilter)
  const midPoint = overallFilter.midPoint;
  
  console.log("Length of array:", locationList.length);
  // console.log(locationList[0]);

  const pickRandom = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random]
  }

  const displayArray = (locationlist) =>{
    let locationCount = 0
    let topFive = []
    
    while(locationCount < locationlist.length){
        let locationCountString = locationCount.toString()
        topFive.push(
        <Marker
          identifier={locationCountString}
          coordinate={{
            latitude: locationlist[locationCount].location.latitude,
            longitude: locationlist[locationCount].location.longitude,
          }}
          onPress={(event) => (setLocationDetails(parseInt(event.nativeEvent.id)), console.log("I've pressed", locationDetails))}
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
      let topFiveSet = new Set(topFive)
      topFive = Array.from(topFiveSet)
      // const map1 = topFive.map((marker,index) => (index % 2 == 0)?{marker.onPress={}}) 
    return topFive;
  }

  if(midPoint == null){
    midPoint = {latitude: locationList[0].location.latitude, longitude: locationList[0].location.latitude}
  }


  return (
    <View style={styles.container}>
      <Text>Location List screen</Text>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: locationList[locationDetails].location.latitude - 0.015,
          longitude: locationList[locationDetails].location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: midPoint.latitude,
            longitude: midPoint.longitude,
          }}
          pinColor={"gold"}
        />
        <Circle
            key={midPoint.latitude + midPoint.longitude}
            center={{
              latitude: midPoint.latitude,
              longitude: midPoint.longitude,
            }}
            radius={overallFilter.radius}
            strokeWidth={1}
            strokeColor={"#1a66ff"}
            fillColor={"rgba(230,238,255,0.5)"}
          />
        
        {displayArray(locationList)}
        
        
      </MapView>

      {locationDetails == 0 && 
      <View>
      <SafeAreaView>
          <Card >
            <Card.Image 
                style={styles.imageStyle}
                source={{uri:pickRandom(locationList[locationDetails].images)}}
                PlaceholderContent={<ActivityIndicator color={'#000000'}/>}
            />
            <Card.Divider style={styles.divider}/>
            <View>
              <ScrollView>
                  <Text >
                    <Image style={styles.icon} source={require("../../assets/clock.png")}/>
                    Name: {locationList[locationDetails].name}
                  </Text>          
                  <Text style={styles.locationTextStyle}>
                    Ratings: {locationList[locationDetails].rating}
                  </Text>
                  {/* <Text>
                    <Image style={styles.icon} source={require("../../assets/clock.png")}/>
                    <Text style={styles.locationTextStyle}>
                      Opening Hours: {locationList[locationDetails].businessHour[0].openTime}
                    </Text>
                    <Text style={styles.locationTextStyle}>
                      Closing Hours: {locationList[locationDetails].businessHour[0].closeTime}
                    </Text>
                  </Text> */}
              </ScrollView>
              </View>
              <Card.Divider style={styles.divider}/>
              <Text style={styles.locationTextStyle}>
                    Amenities: {[locationList[locationDetails].amenities, locationList[locationDetails].cuisine]}
                  </Text>
            </Card>
        </SafeAreaView>
      </View>
      }

      {locationDetails != 0 &&
      
      <View style={[styles.filterContainer]}>
        {console.log(locationList[locationDetails])}
        <SafeAreaView>
          <Card >
            <Card.Image 
                style={styles.imageStyle}
                source={{uri:pickRandom(locationList[locationDetails].images)}}
                PlaceholderContent={<ActivityIndicator color={'#000000'}/>}
            />
            <Card.Divider style={styles.divider}/>
            <View>
              <ScrollView>
                  <Text >
                    <Image style={styles.icon} source={require("../../assets/clock.png")}/>
                    Name: {locationList[locationDetails].name}
                  </Text>          
                  <Text style={styles.locationTextStyle}>
                    Ratings: {locationList[locationDetails].rating}
                  </Text>
                  {/* <Text>
                    <Image style={styles.icon} source={require("../../assets/clock.png")}/>
                    <Text style={styles.locationTextStyle}>
                      Opening Hours: {locationList[locationDetails].businessHour[0].openTime}
                    </Text>
                    <Text style={styles.locationTextStyle}>
                      Closing Hours: {locationList[locationDetails].businessHour[0].closeTime}
                    </Text>
                  </Text> */}
              </ScrollView>
              </View>
              <Card.Divider style={styles.divider}/>
              <Text style={styles.locationTextStyle}>
                    Amenities: {[locationList[locationDetails].amenities, locationList[locationDetails].cuisine]}
                  </Text>
            </Card>
        </SafeAreaView>
      </View>
      }
      
      
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
  imageStyle:{
    borderRadius: 5,
    // resizeMode: 'stretch',
    margin: 10,
    alignSelf: 'center',
    // width: '60%', 
    // height: "60%",
    // aspectRatio: 1
  },
  locationTextStyle: {
    fontSize: 14,
    textAlign: "center", 
    alignSelf: "stretch",
    color: "#000000"
  },
  divider: {
    paddingVertical: 5
  },
  imageSize:{
    borderRadius: 5,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%', 
    height: "85%",
    aspectRatio: 1
  },
  icon: {
    // justifyContent: "flex-start",
    height: 20,
    width: 20,
    
    // marginRight:20,
    // borderRadius: 100 / 2,
    // overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "black"
  },
});
