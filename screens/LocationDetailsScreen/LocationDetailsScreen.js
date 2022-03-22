import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {Card} from "react-native-elements";
import React, { useEffect, useState } from "react";
import ComplementaryLocations from "./ComplementaryLocations";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationDetailsScreen = (props) => {
  const { totalLocationList, setTotalLocationList, navigation } = props;

  const locationDetail = props.route.params.location;
  const prevLocation = props.route.params.prevLocation;

  useEffect(() => {
    setShowComplementary(false);
  }, [locationDetail]);

  const [showComplementary, setShowComplementary] = useState(false);

  const handleRegenerateLocation = () => {
    const tempList = totalLocationList;
    if (tempList.length < 1) {
      navigation.navigate("NoResults");
    }
    const randomIndex = Math.floor(Math.random() * tempList.length);
    const randomLocation = tempList[randomIndex];
    tempList.splice(randomIndex, 1);
    setTotalLocationList(tempList);
    navigation.navigate("LocationDetails", { location: randomLocation });
  };

  const handleVisiting = () => {
    // Code to add location to user history in firebase
    setShowComplementary(true);
  };

  const pickRandomImage = (array) => {
    if(array.length == 0){
      return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
    }
    else{
      const random = Math.floor(Math.random() * array.length);
      return array[random]
    }
  };

  if (locationDetail === null) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: locationDetail.location.latitude - 0.0122,
          longitude: locationDetail.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: locationDetail.location.latitude,
            longitude: locationDetail.location.longitude,
          }}
        />
      </MapView>
      {!showComplementary && (
          <View style={styles.bottomSheet}>
            <SafeAreaView style={styles.detailsScroll}>
            <ScrollView nestedScrollEnabled={true}>
              <Card style={{alignSelf:"center"}}>
                  <View>
                    <Card.Image 
                        style={styles.imageStyle}
                        source={{uri:pickRandomImage(locationDetail.images)}}
                        PlaceholderContent={<ActivityIndicator color={'#000000'}/>}
                          />
                    </View>
                  <Card.Divider style={styles.divider}/>
                  <Text style={styles.locationTextStyle}>
                    <Image style={styles.locationIcon} source={require("../../assets/place.png")}/>
                      Name: {locationDetail.name}
                  </Text>
                  <Text style={styles.locationTextStyle}>
                    <Image style={styles.locationIcon} source={require("../../assets/ratings.png")}/>
                      Ratings: {locationDetail.rating}
                  </Text>
                  <Text style={styles.locationTextStyle}>
                    <Image style={styles.locationIcon} source={require("../../assets/category.png")}/>
                      Type: {locationDetail.type}
                  </Text>
                  <Card.Divider style={styles.divider}/>
                  <Text style={styles.infoText}>
                    Postal Code : {locationDetail.address.postalCode}
                  </Text>
                  <Text style={styles.infoText}>
                    Website : {locationDetail.officialWebsite}
                  </Text>
                  <Text style={styles.gap} />
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      onPress={handleVisiting}
                      style={styles.buttonVisit}
                    >
                      <Image
                        source={require("../../assets/Visit.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.buttonText}>I Am Visiting</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.gap} />
                  {!prevLocation && (
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.buttonRandom}
                        onPress={handleRegenerateLocation}
                      >
                        <Image
                          source={require("../../assets/Random.png")}
                          style={styles.icon2}
                        />
                        <Text style={styles.buttonText}>Find Another Location</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <Text style={styles.gap} />
                </Card>
              </ScrollView>
              </SafeAreaView>
            </View>
          
      )}

      {showComplementary && (
        <ComplementaryLocations
          locationDetail={locationDetail}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  bottomSheet: {
    backgroundColor: "white",
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    top: "47%",
    width: "100%",
    flex: 0.5,
  },

  divider: {
    paddingVertical: 5
  },

  imageSize:{
    borderRadius: 5,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%', 
    height: "100%",
    aspectRatio: 1
  },

  locationTextStyle: {
    fontSize: 16,
    textAlign: "center", 
    alignSelf: "stretch",
    paddingVertical: 2,
    color: "#000000",
    fontWeight: "bold",
    paddingHorizontal: 10
  },

  locationIcon: {
    //justifyContent: "flex-start",
    height: 20,
    width: 20,
    marginHorizontal: 10
  },

  infoText: {
    color: "black",
    fontSize: 17,
    textAlign: "left",
  },

  text: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
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

  buttonView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },

  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
  },

  gap: {
    fontSize: 5,
  },

  buttonRandom: {
    width: "100%",
    // top: "50%",
    backgroundColor: "#ffd68c",
    borderRadius: 10,
    // position:"absolute",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    flexDirection: "row",
    height: 40,
    borderWidth: 2,
    width: 20,
    left: -70,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  icon2: {
    flexDirection: "row",
    height: 40,
    borderWidth: 2,
    width: 40,
    left: -30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  detailsScroll: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    // height: "100%",
    // width: "90%",
    // // alignItems: "center",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // position: "absolute",
    // left: "8%",
    // top: "10%",
    // paddingHorizontal: 30,
    // borderWidth: 1,
    // borderColor: "#707070",
    // marginHorizontal: 10,
  },
});

export default LocationDetailsScreen;
