// components/login.js
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList,SafeAreaView,ScrollView } from 'react-native';
import { Firebase, db } from "../database/firebase";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// const HistoryScreen = (userDetails) => {  
//     const DataTable = userDetails.userDetails.history  
    // let table = []
    // let newDict = {}
    // newDict['name'] = 'Ghost'
    // newDict['timeOfVisit'] = "13 04 1999"
    // table.push(newDict)
    // newDict = {}
    // newDict['name'] = 'Ghost'
    // newDict['timeOfVisit'] = "13 04 1999"
    // table.push(newDict)


//     const fetchHistory = async () => {
//       let snapshot = await Firebase.firestore().collection("Users").doc(Firebase.auth().currentUser.uid).get();
//       if(snapshot){
//         let history = snapshot.data().history
//         // console.log(history)
//         let newHistory = convertArrayToDict(history)
//         console.log(DataTable)
//         // return checkHistory(table)
//       }
//     }

    // const convertArrayToDict = (array) => {
    //   let i = 0;
    //   let newArray = []
    //   let newDict = {}
    //   let displayArray = []
    //   if(array.length == 0){
    //     return array
    //   }
    //   while(i<array.length){
    //     if(i==0){
    //       newDict["name"] = array[i]
    //     }
    //     else if(i%2!=0){
    //       newDict["timeOfVisit"] = array[i]
    //     }
    //     else{
    //       newArray.push(newDict)
    //       newDict = {}
    //       newDict["name"] = array[i]
    //     }
    //     i += 1
    //   }
    //   return newArray
    // }

//     const renderItem = ({item}) => 
//     { console.log(item)        
//       return <View style={styles.textBox}>
//         <Image 
//             style={styles.icon}
//             source={require("../../assets/favicon.png")}/>
//         <View>
//           <Text style={styles.locationTextStyle}>
//             Visited: {item.name}
//           </Text>
//           <Text style={styles.locationTextStyle}>Time Of Visit: {item.timeOfVisit}</Text>
//         </View>
//       </View>
//     }
    
//     const checkHistory = (variable) => {
      
//       if(variable.length === 0){
//         return<View style={styles.textContainer}>
//           <Text style={styles.textStyle}>
//             You have not visited any place yet.
//           </Text>
//           <Text style={styles.textStyle}>
//             Start Visiting!
//           </Text>
//         </View> 
//       }
//       return <FlatList
//           nestedScrollEnabled = {true}
//           scrollEnabled = {true}
//           data={variable}
//           renderItem={renderItem}
//           // keyExtractor={(item, index) => index.toString()}
//       />
      
//     }

//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.border}>
//           <Text style={styles.HeadStyle}>
//             {userDetails.userDetails.userName}'s User History
//           </Text>
//           <View style={styles.insideBorder}>
//             {fetchHistory()}
//           </View>
          
//         </View>
//         <Image
//             style={styles.banner}
//             source={require('../AuthenticationScreen/AuthenticationAssets/meetwhere-icon.png')}
//         />
//       </SafeAreaView>
//     );
// };

const HistoryScreen = (userDetails) => {
  const DataTable = userDetails.userDetails.history

  //test example
  let table = []
  let newDict = {}
  newDict['name'] = 'Ghost'
  newDict['timeOfVisit'] = "13 04 1999"
  table.push(newDict)
  newDict = {}
  newDict['name'] = 'Ghost'
  newDict['timeOfVisit'] = "13 04 1999"
  table.push(newDict)

  const convertArrayToDict = (array) => {
    let i = 0;
    let newArray = []
    let newDict = {}
    let displayArray = []
    if(array.length == 0){
      return array
    }
    while(i<array.length){
      if(i==0){
        newDict["name"] = array[i]
      }
      else if(i%2!=0){
        newDict["timeOfVisit"] = array[i]
      }
      else{
        newArray.push(newDict)
        newDict = {}
        newDict["name"] = array[i]
      }
      i += 1
    }
    return newArray
  }

  const historyTable = convertArrayToDict(DataTable)

  const checkHistory = (variable) => {
    if(variable.length === 0){
      return<View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          You have not visited any place yet.
        </Text>
        <Text style={styles.textStyle}>
          Start Visiting!
        </Text>
      </View> 
    }
    return <FlatList
        // nestedScrollEnabled = {true}
        scrollEnabled = {true}
        data={variable}
        
        renderItem={({item}) => 
        
          <View style={styles.textBox}>
            <Image 
                style={styles.icon}
                source={require("../../assets/favicon.png")}/>
            <View>
              <Text style={styles.locationTextStyle}>
                Location: {item.name}
              </Text>
              {/* <Text style={styles.locationTextStyle}>Visited Time:</Text> */}
              <Text style={styles.timeText}>{item.timeOfVisit}</Text>
            </View>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
    />
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.border}>
        <Text style={styles.HeadStyle}>
          {userDetails.userDetails.userName}'s User History
        </Text>
        <View style={styles.insideBorder}>
          {checkHistory(historyTable)}
        </View>
        
      </View>
      <Image
          style={styles.banner}
          source={require('../AuthenticationScreen/AuthenticationAssets/meetwhere-icon.png')}
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
      backgroundColor: '#fff'
      },
  border: {
      flex:1,
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
      alignItems: "flex-start",
      flexDirection: "column",
      justifyContent: "flex-start",
      borderColor: "black",
    },
  HeadStyle: {
      
      textAlign: "center", 
      alignSelf: "stretch",
      borderBottomWidth: 1,
      fontWeight: "bold",
      fontSize:24,
      padding:10,
      // backgroundColor: '#ffe0f0'
  },
  textContainer:{
    flex: 1,
    padding:45,
    paddingVertical:200,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  textBox:{
    flex: 1,
    paddingHorizontal:30,
    paddingVertical:5,
    borderBottomWidth: 1,
    flexDirection: "row",
    // alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    flex: 1,
      fontSize: 14,
      fontStyle: "italic",
      alignSelf: "center",
      fontFamily: "serif",
      color: "#7B7B7B"
  },
  icon: {
    // justifyContent: "flex-start",
    // height: 50%,
    // width: 40,
    
    marginRight:5,
    borderRadius: 100 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black"
  },
  locationTextStyle: {
    fontSize: 20,
    textAlign: "center", 
    alignSelf: "stretch",
    fontFamily: "serif",
    color: "#000000"
  },
  timeText: {
    fontSize: 16,
    textAlign: "center", 
    alignSelf: "stretch",
    fontStyle: "italic",
    color: "#000000"
  },
  banner:{
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
});
