// components/login.js
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Firebase, db } from "../database/firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HistoryScreen = ({ navigation, userDetails }) => {
  const convertArrayToDict = (array) => {
    let i = 0;
    let newArray = [];
    let newDict = {};
    let displayArray = [];
    if (array.length == 0) {
      return array;
    }
    while (i < array.length) {
      if (i % 2 == 0) {
        newDict = {};
        newDict["nameCategory"] = [array[i].name, array[i].categoryDescription];
      } else if (i % 2 != 0) {
        newDict["timeOfVisit"] = array[i];
        newArray.push(newDict);
      }
      // console.log(array[i].categoryDescription)
      i += 1;
    }
    return newArray.reverse();
  };

  const [isFetched, setIsFetched] = useState(false);
  const [oldTable, setNewTable] = useState([]);
  const [hist, setHist] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      await fetchHistory();
    };

    fetch();
  }, []);

  const fetchHistory = async () => {
    let snapshot = await db
      .collection("Users")
      .doc(Firebase.auth().currentUser.uid)
      .get();

    let history = snapshot.data().history;

    setHist(history);
    var newHistory = convertArrayToDict(history);
    setNewTable(newHistory);
    setIsFetched(true);
  };

  function deleteHistory() {
    const userProfile = db
      .collection("Users")
      .doc(Firebase.auth().currentUser.uid);
    // setLocationDetails(locationDetails)
    let userHistory = [];
    userProfile
      .get()
      .then((doc) => {
        if (doc.exists) {
          userProfile
            .update({
              history: [],
            })
            .then(() => {
              setNewTable([]);
              console.log("Document successfully updated!");
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  const checkHistory = (variable) => {
    if (variable.length === 0) {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>
            You have not visited any place yet.
          </Text>
          <Text style={styles.textStyle}>Start Visiting!</Text>
        </View>
      );
    }
    return (
      <FlatList
        // nestedScrollEnabled = {true}
        scrollEnabled={true}
        data={variable}
        renderItem={({ item }) => (
          <View style={styles.textBox}>
            {item.nameCategory[1] == "Food & Beverages" && (
              <Image
                style={styles.icon}
                source={require("../../assets/food.png")}
              />
            )}
            {item.nameCategory[1] == "Bars & Clubs" && (
              <Image
                style={styles.icon}
                source={require("../../assets/bars.png")}
              />
            )}
            {item.nameCategory[1] == "Attractions" && (
              <Image
                style={styles.icon}
                source={require("../../assets/attractions.png")}
              />
            )}
            <View style={styles.textWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LocationDetails", {
                    location: findLocation(item.nameCategory[0], hist),
                    prevLocation: { key: "value" },
                    fromHistory: true,
                  });
                }}
              >
                <Text style={styles.locationTextStyle}>
                  {item.nameCategory[0]}
                </Text>
              </TouchableOpacity>
              {/* <Text style={styles.locationTextStyle}>Visited Time:</Text> */}
              <Text style={styles.timeText}>{item.timeOfVisit}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };
  function findLocation(locationName, table) {
    let i = 0;
    while (i < table.length) {
      if (table[i].name == locationName) {
        return table[i];
      }
      i += 1;
    }
  }
  // fetchHistory();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.HeadStyle}>
          {userDetails.userName}'s User History
        </Text>
        <View style={styles.insideBorder}>{checkHistory(oldTable)}</View>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => deleteHistory()}
          style={styles.deleteHistory}
        >
          <Text style={styles.buttonText}>Clear History</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.banner}
        source={require("../AuthenticationScreen/AuthenticationAssets/meetwhere-icon.png")}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    padding: 20,
    // minHeight: 700,
    backgroundColor: "#fff",
  },
  border: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderColor: "black",
    borderWidth: 2,
  },
  insideBorder: {
    flex: 1,
    display: "flex",
    borderColor: "black",
  },
  HeadStyle: {
    textAlign: "center",
    alignSelf: "stretch",
    borderBottomWidth: 1,
    fontWeight: "bold",
    fontSize: 24,
    padding: 10,
    // backgroundColor: '#ffe0f0'
  },
  textContainer: {
    flex: 1,
    padding: 45,
    paddingVertical: 200,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  textBox: {
    // flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderBottomWidth: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonView: {
    height: 50,
    justifyContent: "space-between",
    // paddingVertical: 10,
  },
  buttonVisit: {
    width: "100%",
    // top: "10%",
    backgroundColor: "#FF4500",
    borderRadius: 10,
    // position:"absolute",
    // height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteHistory: {
    width: "100%",
    // top: "10%",
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    // position:"absolute",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#ff0021",
  },
  textStyle: {
    flex: 1,
    fontSize: 14,
    fontStyle: "italic",
    alignSelf: "center",
    color: "#7B7B7B",
  },
  icon: {
    marginRight: 25,
    borderRadius: 100 / 2,
    height: 52,
    width: 52,
    overflow: "hidden",
    borderWidth: 0.8,
    borderColor: "black",
  },
  locationTextStyle: {
    fontSize: 21,
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "serif",
    color: "#000000",
  },
  timeText: {
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    fontStyle: "italic",
    color: "#000000",
  },
  banner: {
    borderTopWidth: 5,
    // flex: ,
    height: 80,
    width: 210,
    // marginLeft: 75,
    alignSelf: "center",
    // marginTop:170,
    // position: 'absolute',
    // bottom:0
  },
  textWrapper: {
    flexShrink: 1,
  },
});
