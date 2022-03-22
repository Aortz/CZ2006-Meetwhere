import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, ScrollView, SafeAreaView, TouchableOpacity, Alert, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import { Card,Divider, CheckBox } from "react-native-elements";
import { useEffect } from 'react';
import { Firebase, db } from "../database/firebase";
import ComplementaryLocations from "../LocationDetailsScreen/ComplementaryLocations";


import React, { useState } from "react";

const { width, height } = Dimensions.get("screen");

const LocationListScreen = (props) => {
  const { totalLocationList, setTotalLocationList, navigation } = props;
  let locationList = props.route.params.locationList
  const overallFilter = props.route.params.overallFilter
  const [locationDetails, setLocationDetails] = useState(0)
  
  const midPoint = overallFilter.midPoint;

  // const [showComplementary, setShowComplementary] = useState(false);
  const locationID = props.route.params.location;
  // const prevLocation = props.route.params.prevLocation;

  useEffect(() => {
    setSelection(false);
  }, [locationID]);

  const [isSelected, setSelection] = useState(false);
  // const handleVisiting = () => {
  //   // Code to add location to user history in firebase
  //   setShowComplementary(true);
  // };
  
  
  //remove duplicates from list
  const removeDuplicate = (array) => {
    array = array.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.place === value.place && t.name === value.name
    )))
    return array
  }

  locationList  = removeDuplicate(locationList)
  // console.log(locationList.length)

  const displayArray = (locationlist) =>{
    let locationCount = 0
    let topFive = []
    
    while(locationCount < locationlist.length){
        let locationCountString = locationCount.toString()
        // console.log(locationList[locationCount].name);
        topFive.push(
        <Marker
          identifier={locationCountString}
          coordinate={{
            latitude: locationlist[locationCount].location.latitude,
            longitude: locationlist[locationCount].location.longitude,
          }}
          onPress={(event) => (setLocationDetails(parseInt(event.nativeEvent.id)), console.log("I pressed", event.nativeEvent.id))}
        />,
        )
        locationCount += 1
      }
      
      let topFiveSet = new Set(topFive)
      topFive = Array.from(topFiveSet)
      // const map1 = topFive.map((marker,index) => (index % 2 == 0)?{marker.onPress={}}) 
    return topFive;
  }

  const reviewHandler = (array) => {
    const random = Math.floor(Math.random() * array.length);
    if(array.length > 0){
      return (
      <View>
        <Text style={styles.firstDiv}>
          Reviews
        </Text>
        <Text style={styles.locationTextStyle}>
          {array[random].text}
        </Text>
        <Text style={styles.locationTextStyle}>
          Author: {array[random].authorName}
        </Text>
      </View>
      )  
    }
  }

  const pickRandomImage = (array) => {
    if(array.length == 0){
      return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
    }
    else{
      const random = Math.floor(Math.random() * array.length);
      return array[random]
    }
  }

  if(midPoint == null){
    midPoint = {latitude: locationList[0].location.latitude, longitude: locationList[0].location.latitude}
  }


  const buttonHandler = (isBack, array, number) => {
    if(number > 0 && isBack){
      return setLocationDetails(number-1)
    }
    else if(number == 0 && isBack){
      return setLocationDetails(array.length - 1)
    }
    else if(number < array.length-1 && !isBack){
      return setLocationDetails(number+1)
    }
    else if(number == array.length-1 && !isBack){
      return setLocationDetails(0)
    }
    else {
      Alert.alert("No such location")
    }
  }
  
  function historyHandler() {
    const userProfile = Firebase.firestore().collection("Users").doc(Firebase.auth().currentUser.uid);
    // useEffect(() => {
    //   setSelection(!isSelected)
    // })
    setSelection(true)
    // setLocationDetails(locationDetails)
    let userHistory = []
    userProfile.get().then((doc) => {
      if (doc.exists) {
          // console.log("Document data:", doc.data().history);
          userHistory = doc.data().history
          let currentDateTime = new Date().toLocaleString()
          let historyData = new Set([locationList[locationDetails].name, currentDateTime])
          userHistory.push(...historyData)
          userProfile.update({
            history: userHistory
          })
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
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
        
        {!isSelected && displayArray(locationList)}
        {isSelected && displayArray(locationList)[locationDetails]}
      </MapView>

      {locationDetails >= 0 && !isSelected &&
      <View style={[styles.filterContainer]}>
        <SafeAreaView style={styles.viewContainer}>
          <TouchableOpacity style={styles.buttonStyle} title="Previous" onPress={() => buttonHandler(true, locationList, locationDetails)}>
            <Image style={styles.arrowicon} source={require("../../assets/back.png")}/>
          </TouchableOpacity>
          <Card style={{alignSelf: "center"}}>
            <ScrollView nestedScrollEnabled={true}>
            <View>
                <ScrollView nestedScrollEnabled={true} contentContainerStyle={{flex:1}}>
                  <Card.Image 
                      style={styles.imageStyle}
                      source={{uri:pickRandomImage(locationList[locationDetails].images)}}
                      PlaceholderContent={<ActivityIndicator color={'#000000'}/>}
                  />
                </ScrollView>
              </View>
              <Card.Divider style={styles.divider}/>              
              <View>        
                <Text style={styles.firstDiv}>
                  <Image style={styles.icon} source={require("../../assets/place.png")}/>
                  Name: {locationList[locationDetails].name}
                </Text>          
                <Text style={styles.firstDiv}>
                <Image style={styles.icon} source={require("../../assets/ratings.png")}/>
                  Ratings: {locationList[locationDetails].rating}
                </Text>
                <Text style={styles.firstDiv}>
                <Image style={styles.icon} source={require("../../assets/tags.png")}/>
                  Tags: {[locationList[locationDetails].type.concat(", ", locationList[locationDetails].categoryDescription)]}
                </Text>
              </View>
              <Card.Divider style={styles.divider}/>
              <Text style={styles.secondDiv}>
                Official Website
              </Text>
              <Text style={styles.websiteText} 
                    onPress={() => Linking.openURL('https://'.concat(locationList[locationDetails].officialWebsite))}>
                  {locationList[locationDetails].officialWebsite}
              </Text>
              <Card.Divider style={styles.divider}/>
              <Text style={styles.firstDiv}>
                Description
              </Text>
              <Text style={styles.locationTextStyle}>
                {[locationList[locationDetails].description]}
              </Text>
              <Card.Divider style={styles.divider}/>
              {reviewHandler(locationList[locationDetails].reviews)}
              <Card.Divider style={styles.divider}/>
              {/* <View style={styles.checkboxContainer}>
                <CheckBox
                  title="Are you visiting?"
                  style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  checked={isSelected}
                  onPress={() => historyHandler()}
                  checkedTitle="Added to your History"
                />
              </View> */}
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => historyHandler()}
                  style={styles.buttonVisit}
                >
                  <Image
                    source={require("../../assets/Visit.png")}
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.buttonText}>I Am Visiting</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
          </Card>
          <TouchableOpacity style={styles.buttonStyle} title="Next" onPress={() => buttonHandler(false, locationList, locationDetails)}>
            <Image style={styles.arrowicon} source={require("../../assets/next.png")}/>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      }
      {isSelected &&
        // <View style={[styles.filterContainer2]}>
        //   <View style={{backgroundColor: "white"}}>        
        //     <Text style={styles.locationTextStyle}>
        //       <Image style={styles.icon} source={require("../../assets/place.png")}/>
        //       Name: {locationList[locationDetails].name}
        //     </Text>          
        //     <Text style={styles.locationTextStyle}>
        //     <Image style={styles.icon} source={require("../../assets/ratings.png")}/>
        //       Ratings: {locationList[locationDetails].rating}
        //     </Text>
        //     <Text style={styles.locationTextStyle}>
        //     <Image style={styles.icon} source={require("../../assets/category.png")}/>
        //       Type: {[locationList[locationDetails].type]}
        //     </Text>
        //     <Text style={styles.urlText}>
        //       Click on the red drop pin!
        //     </Text>
            
        //   </View>
        // </View>  
        <ComplementaryLocations
          locationDetail={locationList[locationDetails]}
          navigation={navigation}
        />  
          
        
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
  viewContainer: {
    flex: 1,
    flexDirection: "row"
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#707070",
  },
  filterContainer2: {
    // flex: 0.25,
    backgroundColor: "white",
    width: width / 1.5,
    height: height/4,
    alignItems: 'center',
    justifyContent: 'center', 
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // borderTopEndRadius: 30,
    // borderBottomEndRadius: 30,
    bottom: 20,
    borderWidth: 1,
    borderColor: "#707070",
  },
  firstDiv: {
    fontSize: 15,
    textAlign: "center", 
    alignSelf: "stretch",
    paddingVertical: 2,
    color: "#000000",
    fontWeight: "bold",
    paddingHorizontal: 10
  },
  secondDiv: {
    fontSize: 14,
    textAlign: "center", 
    alignSelf: "stretch",
    paddingVertical: 2,
    color: "#000000",
    paddingHorizontal: 10
  },
  imageStyle:{
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    alignSelf: 'center',
  },
  buttonStyle: {
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },
  websiteText: {
    color: "blue",
    textAlign: "center",
    fontStyle: "italic",
  },
  buttonVisit: {
    width: "100%",
    // top: "10%",
    backgroundColor: "#95FF9F",
    borderRadius: 10,
    // position:"absolute",
    // height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    // flexDirection: "row",
    height: 25,
    // borderWidth: 2,
    width: 20,
    marginHorizontal: 10,
    // left: -70,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  buttonView: {
    flexDirection: "row",
    flex: 1,
    height: 40,
    justifyContent: "space-between",
  },

  locationTextStyle: {
    fontSize: 14,
    textAlign: "center", 
    alignSelf: "stretch",
    paddingVertical: 2,
    color: "#000000"
  },
  urlText: {
    fontSize: 18,
    textAlign: "center", 
    alignSelf: "stretch",
    color: "red"
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
    marginHorizontal: 10,
    paddingHorizontal: 10
  },
  arrowicon: {
    alignSelf: "center",
    height: 20,
    width: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignSelf: "center",
    color:"red"
    // marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },

});