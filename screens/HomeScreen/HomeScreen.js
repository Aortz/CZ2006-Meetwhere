import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Pressable } from "react-native";
import { Firebase, db } from "../database/firebase";
import { QuerySnapshot } from "firebase/firestore";


  



const HomeScreen = ({ navigation, setUserOption,userDetails }) => {
  // const [popular,setPopular] = useState(null);  
  // useEffect(()=>{
  //   var array = []; 
  //   const attractRef = Firebase.firestore().collection("Attractions").get().then(QuerySnapshot=>{
  //     QuerySnapshot.forEach(doc =>{
  //       array.push(doc.data());
  //     });
  //   });
  //   setPopular(array[Math.floor(Math.random()*array.length)]);
  // },[]);

  // const [popular,setPopular] = useState(null); 
  // useEffect(()=>{
  //   const attractRef = Firebase.firestore().collection("Attractions").doc("Absolute Cycle").get()
  //   .then(document=>{
  //     //console.log(document.data().images[0]);
  //     setPopular(document.data().images[0]);
  //   })

  // })

  const popular = ['https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png','https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png']

  
        
        
  if(userDetails===null){
    return null; 
  }

  return (
    <View style={styles.container}>
  
        <Text style={styles.header}>Welcome {userDetails.userName}!</Text>
        {popular && popular.map((image) => {
          return <View style={{height: 100}}>
          <Image source={{uri: image}} style={styles.icon}/>
        </View>
        })}
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
    height: 580,
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
    height: "60%",
    width: "60%",
    alignContent: "center",
  },
  touchableStyle: {
    borderWidth: 5,
    height: "20%",
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
