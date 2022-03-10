import { QuerySnapshot } from "firebase/firestore";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Pressable } from "react-native";
import { Firebase, db } from "../database/firebase";

const HomeScreen = ({ navigation, setUserOption,userDetails }) => {
  if (userDetails === null){
    return null
  }
  // const docRef = db.collection("Attractions")
  // let array= []
  // docRef.onSnapshot((querySnapshot)=>{
  //   querySnapshot.map(doc => {
  //     const id = doc.id
  //     // console.log("1",id)
  //     array.push(id)
  //     // console.log(array['id'])
  // });
  // })
  // console.log(array[0])
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Text style={styles.header}>Welcome {userDetails.userName}!</Text>
        <View style={styles.iconsview}>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => navigation.navigate("InputLocation")}
          >
            <Image
              source={require("../../assets/random_location.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => navigation.navigate("InputLocation")}
          >
            <Image
              source={require("../../assets/suggested_list.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => navigation.navigate("History")}
          >
            <Image
              source={require("../../assets/history.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Pressable
          style={styles.signOutButton}
          title="Sign Out"
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
        
        </View>
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
  icons: {
    flexDirection: "column",
    height: 700,
    borderWidth: 2,
    width: "95%",
  },
  header: {
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    color: "black",
    
  },
  iconsview: {
    flexDirection: "row",
    justifyContent: "space-between",
    height:"60%",
    width: "60%",
    alignContent: "center",
  },
  touchableStyle: {
    height: "90%",
    justifyContent: "center",
  },
  signOutText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  signOutButton: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    height: 48,
    width: 303,
    // bottom: 210,
    backgroundColor: "#20E3C0",
  },
});
