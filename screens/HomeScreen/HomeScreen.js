import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Firebase } from "../database/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Divider } from "react-native-elements";

const HomeScreen = ({ navigation, setUserOption, userDetails }) => {
  const randomAttraction = () => {
    return Math.floor(Math.random() * 367) + 1; //gives the string for some attraction spot, to be used in retrieving from db
  };
  const randomBar = () => {
    return Math.floor(Math.random() * 106) + 1; //gives the string for some bar spot, to be used in retrieving from db
  };
  const randomFood = () => {
    return Math.floor(Math.random() * 891) + 1; ////gives the string for some food spot, to be used in retrieving from db
  };

  const randomTop = () => {
    return Math.floor(Math.random() * 49) + 1;
  };

  const [randomized, setRandomized] = useState(null);
  const [randomscreen, setRandomScreen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toprated, setTopRated] = useState(null);
  const [topscreen, setTopScreen] = useState(null);

  const fetchData = () => {
    let array_index = [];
    let array_photos = [];
    let array_names = [];
    let array_of_array = [];
    let array_random = [];

    for (let i = 0; i < 2; i++) {
      //generate 6 indexes
      array_index.push(String(randomAttraction()));
      //console.log(randomAttraction());
      array_index.push(String(randomBar()));
      //console.log(randomBar());
      array_index.push(String(randomFood()));
      //console.log(randomFood());
    }

    for (var i = 0; i < 6; i++) {
      //get the data from db via the 6 indexes
      if (i % 3 == 0) {
        let attractRef = Firebase.firestore()
          .collection("Attractions")
          .doc(array_index[i])
          .get()
          .then((document) => {
            // console.log(document.data().images[0]);
            array_photos.push(String(document.data().images[0]));
            // console.log(array_photos);
            // console.log(document.data().name);
            array_names.push(String(document.data().name));
            array_random.push(document.data());
          });
      } else if (i % 3 == 1) {
        let barRef = Firebase.firestore()
          .collection("Bars & Clubs")
          .doc(array_index[i])
          .get()
          .then((document) => {
            //console.log(document.data().images[0]);
            array_photos.push(String(document.data().images[0]));
            //console.log(document.data().name);
            array_names.push(String(document.data().name));
            array_random.push(document.data());
          });
      } else {
        let foodRef = Firebase.firestore()
          .collection("Food & Beverages")
          .doc(array_index[i])
          .get()
          .then((document) => {
            //console.log(document.data().images[0]);
            array_photos.push(String(document.data().images[0]));
            // console.log(document.data().name);
            array_names.push(String(document.data().name));
            // console.log(array_photos);
            // console.log(array_names);
            array_random.push(document.data());
          });
      }
    }

    let top_rated_photos = [];
    let top_rated_names = [];
    let top_rated_rating = [];
    let top_rated_array = [];
    let top_rated_object = [];
    let top_rated_object_array = [];

    let top_rated_attract = Firebase.firestore()
      .collection("Attractions")
      .where("rating", ">", 4.5)
      .orderBy("rating", "desc")
      .limit(20)
      .get()
      .then((QuerySnapshot) => {
        QuerySnapshot.forEach((DocumentSnapshot) => {
          top_rated_object.push(DocumentSnapshot.data());
          top_rated_photos.push(String(DocumentSnapshot.data().images[0]));
          top_rated_names.push(String(DocumentSnapshot.data().name));
          top_rated_rating.push(String(DocumentSnapshot.data().rating));
        });
      });
    let top_rated_bar = Firebase.firestore()
      .collection("Bars & Clubs")
      .where("rating", ">", 4.5)
      .orderBy("rating", "desc")
      .limit(10)
      .get()
      .then((QuerySnapshot) => {
        QuerySnapshot.forEach((DocumentSnapshot) => {
          top_rated_object.push(DocumentSnapshot.data());
          top_rated_photos.push(String(DocumentSnapshot.data().images[0]));
          top_rated_names.push(String(DocumentSnapshot.data().name));
          top_rated_rating.push(String(DocumentSnapshot.data().rating));
        });
      });

    let top_rated_food = Firebase.firestore()
      .collection("Food & Beverages")
      .where("rating", ">", 4.5)
      .orderBy("rating", "desc")
      .limit(20)
      .get()
      .then((QuerySnapshot) => {
        QuerySnapshot.forEach((DocumentSnapshot) => {
          top_rated_object.push(DocumentSnapshot.data());
          top_rated_photos.push(String(DocumentSnapshot.data().images[0]));
          top_rated_names.push(String(DocumentSnapshot.data().name));
          top_rated_rating.push(String(DocumentSnapshot.data().rating));
        });
      });

    setTimeout(() => {
      //console.log('Initial timeout!');
      array_of_array.push(array_photos);
      array_of_array.push(array_names);

      for (let i = 0; i < 6; i++) {
        let num = randomTop();
        top_rated_array.push([
          top_rated_photos[num],
          top_rated_names[num],
          top_rated_rating[num],
        ]);
        top_rated_object_array.push(top_rated_object[num]);
      }
      // console.log(array_index);
      // console.log(array_names);
      // console.log(array_photos);
      // console.log(top_rated_photos);
      // console.log(top_rated_names);
      // console.log(top_rated_rating);
      // console.log(top_rated_array);
      setRandomized(array_of_array);
      setTopRated(top_rated_array);
      setRandomScreen(array_random);
      setTopScreen(top_rated_object_array);
      setLoading(false);
    }, 2500);
  };

  useEffect(() => {
       fetchData();
  }, []);

  if (!randomized) {
    return null;
  }

  //const popular = ['https://pbs.twimgi.com/profile_images/486929358120964097/gNLINY67_400x400.png','https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png']
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/homepage.jpg")} resizeMode="cover" style={styles.background}>
      <View style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
        <Image
          style={styles.banner}
          source={require("../AuthenticationScreen/AuthenticationAssets/meetwhere-icon.png")}
        />
        <Text style={styles.header}>Welcome, {userDetails.userName}!</Text>
        <View style={styles.iconsview}>
            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                setUserOption("Get Random");
                navigation.navigate("InputLocation");
              }}
            >
              <Image
                source={require("../../assets/random_location.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* random location icon button */}

            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => {
                setUserOption("Get List");
                navigation.navigate("InputLocation");
              }}
            >
              <Image
                source={require("../../assets/suggested_list.png")}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* suggested list icon button */}

            <TouchableOpacity
              style={styles.touchableStyle}
              onPress={() => navigation.navigate("History")}
            >
              <Image
                source={require("../../assets/history.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* history icon button  */}
          </View>
        </View>
      
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
          <ScrollView>
            <View>
              <Divider width={1} color={"black"} />
              {randomized && (
                <Text style={styles.header2}>Suggestions of the day!</Text>
              )}
              <Divider width={3} color={"black"} />
            </View>

            <ScrollView horizontal={true} style={styles.cardview}>
              {!loading &&
                randomized[0][0] != "undefined" &&
                randomized[0][0].length > 90 && (
                  <Card style={styles.cardStyle}>
                    <Card.Title>{randomized[1][0]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: randomscreen[0],
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: randomized[0][0] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                  </Card>
                )}

              {!loading &&
                randomized[0][1] != "undefined" &&
                randomized[0][1].length > 90 && (
                  <Card>
                    <Card.Title>{randomized[1][1]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: randomscreen[1],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: randomized[0][1] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                  </Card>
                )}

              {!loading &&
                randomized[0][2] != "undefined" &&
                randomized[0][2].length > 90 && (
                  <Card>
                    <Card.Title>{randomized[1][2]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: randomscreen[2],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: randomized[0][2] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                  </Card>
                )}

              {!loading &&
                randomized[0][3] != "undefined" &&
                randomized[0][3].length > 90 && (
                  <Card>
                    <Card.Title>{randomized[1][3]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: randomscreen[3],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: randomized[0][3] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                  </Card>
                )}

              {!loading &&
                randomized[0][4] != "undefined" &&
                randomized[0][4].length > 90 && (
                  <Card>
                    <Card.Title>{randomized[1][4]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: randomscreen[4],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: randomized[0][4] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                  </Card>
                )}

              {!loading &&
                randomized[0][5] != "undefined" &&
                randomized[0][5].length > 90 && (
                  <Card>
                    <Card.Title>{randomized[1][5]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: randomscreen[5],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: randomized[0][5] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                  </Card>
                )}
            </ScrollView>

            {/* POPULAR  */}

            <View style={{paddingTop: 15}}>
              <Divider width={1} color={"black"} />
              {toprated && (
                <Text style={styles.header2}>
                  Top-Rated Locations
                </Text>
              )}
              <Divider width={3} color={"black"} />
            </View>

            <ScrollView horizontal={true} style={styles.cardview}>
              {!loading &&
                toprated[0][0] != "undefined" &&
                toprated[0][0].length > 90 && (
                  <Card style={styles.cardStyle}>
                    <Card.Title>{toprated[0][1]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: topscreen[0],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: toprated[0][0] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardText}>
                      Rating: {toprated[0][2]}/5
                    </Text>
                  </Card>
                )}

              {!loading &&
                toprated[1][0] != "undefined" &&
                toprated[1][0].length > 90 && (
                  <Card>
                    <Card.Title>{toprated[1][1]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: topscreen[1],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: toprated[1][0] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardText}>
                      Rating: {toprated[1][2]}/5
                    </Text>
                  </Card>
                )}

              {!loading &&
                toprated[2][0] != "undefined" &&
                toprated[2][0].length > 90 && (
                  <Card>
                    <Card.Title>{toprated[2][1]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: topscreen[2],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: toprated[2][0] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardText}>
                      Rating: {toprated[2][2]}/5
                    </Text>
                  </Card>
                )}

              {!loading &&
                toprated[3][0] != "undefined" &&
                toprated[3][0].length > 90 && (
                  <Card>
                    <Card.Title>{toprated[3][1]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: topscreen[3],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: toprated[3][0] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardText}>
                      Rating: {toprated[3][2]}/5
                    </Text>
                  </Card>
                )}

              {!loading &&
                toprated[4][0] != "undefined" &&
                toprated[4][0].length > 90 && (
                  <Card>
                    <Card.Title>{toprated[4][1]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: topscreen[4],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: toprated[4][0] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardText}>
                      Rating: {toprated[4][2]}/5
                    </Text>
                  </Card>
                )}

              {!loading &&
                toprated[5][0] != "undefined" &&
                toprated[5][0].length > 90 && (
                  <Card>
                    <Card.Title>{toprated[5][1]}</Card.Title>
                    <Card.Divider />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("LocationDetails", {
                          location: topscreen[5],
                          prevLocation: { key: "value" },
                        });
                      }}
                    >
                      <Card.Image
                        style={styles.imageSize}
                        source={{ uri: toprated[5][0] }}
                        PlaceholderContent={<ActivityIndicator color={"black"} />}
                      />
                    </TouchableOpacity>
                    <Text style={styles.cardText}>
                      Rating: {toprated[5][2]}/5
                    </Text>
                  </Card>
                )}
            </ScrollView>

            <TouchableOpacity
              style={styles.signOutButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.signOutText}>Sign out</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 5,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  icon: {
    height: 80,
    width: 80,
  },
  background: {
    flex: 1,
    justifyContent: "center"
  },
  banner: {
    marginTop: 30,
    height: 50,
    width: 140,
    alignSelf: "center",
  },
  header: {
    fontSize: 25,
    paddingBottom: 10,
    fontWeight: "bold",
    color: "black",
    textAlign: "center"
  },
  iconsview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 10,
    alignSelf: "center",
    height: "15%",
    width: "90%",
    alignContent: "center",
  },
  cardview: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  touchableStyle: {
    paddingTop: 50,
    height: "20%",
    justifyContent: "center",
  },
  signOutText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  signOutButton: {
    marginVertical: 20,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 10,
    height: 48,
    width: 303,
    //bottom: 210,
    backgroundColor: "#20E3C0",
  },
  imageSize: {
    // borderRadius: 5,
    // resizeMode: 'stretch',
    // alignSelf: 'center',
    // width: '100%',
    // height: "85%",
    // aspectRatio: 1
    borderRadius: 5,
    resizeMode: "stretch",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    height: 150,
    aspectRatio: 1,
  },
  header2: {
    textAlign: "center",
    backgroundColor: "white",
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    color: "black",
  },
  cardText: {
    fontSize: 15,
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
  },
});
