import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { Card } from "react-native-elements";
import React, { useEffect, useState } from "react";
import ComplementaryLocations from "./ComplementaryLocations";
import { SafeAreaView } from "react-native-safe-area-context";
import { Firebase, db } from "../database/firebase";

const { width, height } = Dimensions.get("screen");

const LocationDetailsScreen = (props) => {
  const { totalLocationList, setTotalLocationList, navigation } = props;
  const locationDetail = props.route.params.location;
  const prevLocation = props.route.params.prevLocation;
  const fromHistory = props.route.params.fromHistory;

  useEffect(() => {
    setShowComplementary(false);
  }, [locationDetail]);

  const [showComplementary, setShowComplementary] = useState(false);

  const handleRegenerateLocation = () => {
    const tempList = totalLocationList;
    if (tempList.length < 1) {
      navigation.navigate("NoResults");
      return;
    }
    const randomIndex = Math.floor(Math.random() * tempList.length);
    const randomLocation = tempList[randomIndex];
    tempList.splice(randomIndex, 1);
    setTotalLocationList(tempList);
    navigation.navigate("LocationDetails", { location: randomLocation });
  };

  const reviewHandler = (array) => {
    const random = Math.floor(Math.random() * array.length);
    if (array.length > 0) {
      return (
        <View>
          <Text style={styles.locationTextStyle}>{array[random].text}</Text>
          <Text style={styles.locationTextStyle}>
            Author: {array[random].authorName}
          </Text>
        </View>
      );
    }
  };

  const pickRandomImage = (array) => {
    if (array.length == 0) {
      return "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg";
    } else {
      const random = Math.floor(Math.random() * array.length);
      return array[random];
    }
  };

  const historyHandler = () => {
    var userProfile = db
      .collection("Users")
      .doc(Firebase.auth().currentUser.uid);
    // setLocationDetails(locationDetails)
    let userHistory = [];
    userProfile
      .get()
      .then((doc) => {
        if (doc.exists) {
          var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          userHistory = doc.data().history;

          let currentDateTime = new Date().toLocaleString("en-US", options);
          let historyData = new Set([locationDetail, currentDateTime]);
          userHistory.push(...historyData);
          // setUserDetails((prev) => ({ ...prev, history: userHistory }));
          userProfile
            .update({
              history: userHistory,
            })
            .then(() => {
              console.log("Document successfully updated!");
              setShowComplementary(true);
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
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
          pinColor={"red"}
        />
      </MapView>
      {!showComplementary && (
        <View style={styles.bottomSheet}>
          <SafeAreaView style={styles.detailsScroll}>
            <Card style={{ alignSelf: "center" }}>
              <ScrollView nestedScrollEnabled={true}>
                <View>
                  <Card.Image
                    style={styles.imageStyle}
                    source={{ uri: pickRandomImage(locationDetail.images) }}
                    PlaceholderContent={<ActivityIndicator color={"#000000"} />}
                  />
                </View>
                <Card.Divider style={styles.divider} />
                <Text style={styles.firstDiv}>
                  <Image
                    style={styles.locationIcon}
                    source={require("../../assets/place.png")}
                  />
                  Name: {locationDetail.name}
                </Text>
                <Text style={styles.firstDiv}>
                  <Image
                    style={styles.locationIcon}
                    source={require("../../assets/ratings.png")}
                  />
                  Ratings: {locationDetail.rating}
                </Text>
                <Text style={styles.firstDiv}>
                  <Image
                    style={styles.locationIcon}
                    source={require("../../assets/tags.png")}
                  />
                  Tags: {locationDetail.type}
                </Text>
                <Card.Divider style={styles.divider} />
                {/* <Text style={styles.infoText}>
                    Postal Code : {locationDetail.address.postalCode}
                  </Text> */}
                <Text style={styles.firstDiv}>Official Website</Text>
                <Text
                  style={styles.websiteText}
                  onPress={() =>
                    Linking.openURL(
                      "https://".concat(locationDetail.officialWebsite)
                    )
                  }
                >
                  {locationDetail.officialWebsite}
                </Text>
                <Card.Divider style={styles.divider} />
                <Text style={styles.firstDiv}>Reviews</Text>
                {reviewHandler(locationDetail.reviews)}
                <Card.Divider style={styles.divider} />
                <Text style={styles.gap} />
                {!fromHistory && (
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      onPress={historyHandler}
                      style={styles.buttonVisit}
                    >
                      <Image
                        source={require("../../assets/Visit.png")}
                        style={styles.visitIcon}
                      />
                      <Text style={styles.buttonText}>I Am Visiting</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={styles.gap} />
                {!prevLocation && (
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.buttonRandom}
                      onPress={handleRegenerateLocation}
                    >
                      <Image
                        source={require("../../assets/Random.png")}
                        style={styles.regenerateIcon}
                      />
                      <Text style={styles.buttonText}>
                        Find Another Location
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={styles.gap} />
              </ScrollView>
            </Card>
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
    justifyContent: "flex-end",
  },

  bottomSheet: {
    flex: 0.5,
    backgroundColor: "white",
    height: height / 2.2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 0.7,
    // borderColor: "#707070",
  },
  detailsScroll: {
    flex: 1,
    flexDirection: "row",
  },

  divider: {
    paddingVertical: 5,
  },

  imageSize: {
    borderRadius: 5,
    resizeMode: "stretch",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },

  locationTextStyle: {
    fontSize: 15,
    textAlign: "center",
    alignSelf: "stretch",
    paddingVertical: 2,
    color: "#000000",
  },
  imageStyle: {
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
    alignSelf: "center",
  },

  locationIcon: {
    //justifyContent: "flex-start",
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
  firstDiv: {
    fontSize: 15,
    textAlign: "center",
    alignSelf: "stretch",
    paddingVertical: 2,
    color: "#000000",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },

  infoText: {
    fontSize: 15,
    textAlign: "center",
    alignSelf: "stretch",
    paddingVertical: 2,
    color: "#000000",
    paddingHorizontal: 10,
  },

  websiteText: {
    color: "blue",
    textAlign: "center",
    fontStyle: "italic",
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
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonView: {
    flexDirection: "row",
    flex: 1,
    height: 40,
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

  visitIcon: {
    flexDirection: "row",
    height: 30,
    borderWidth: 1,
    width: 15,
    marginRight: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  regenerateIcon: {
    flexDirection: "row",
    height: 30,
    borderWidth: 1,
    width: 30,
    marginRight: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default LocationDetailsScreen;
