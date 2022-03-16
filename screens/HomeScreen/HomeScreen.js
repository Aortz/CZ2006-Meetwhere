import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,Pressable } from "react-native";
import { Firebase, db } from "../database/firebase";
import { QuerySnapshot } from "firebase/firestore";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card,Divider } from "react-native-elements";


  



const HomeScreen = ({ navigation, setUserOption,userDetails }) => {
//Attractions 367, Bars & Clubs 106 , Food & Beverages 891 

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
  const randomAttraction = ()=>{
    return Math.floor(Math.random()*367)+1   //gives the string for some attraction spot, to be used in retrieving from db
  }
  const randomBar = ()=>{
    return Math.floor(Math.random()*106)+1  //gives the string for some bar spot, to be used in retrieving from db
  }
  const randomFood = ()=>{
    return Math.floor(Math.random()*891)+1  ////gives the string for some food spot, to be used in retrieving from db
  }

  const [randomized,setRandomized] = useState(null); 
  const [loading,setLoading] = useState(true); 
  
  const fetchData =()=>{
    let array_index =[]; 
    let array_photos =[]; 
    let array_names = []; 
    let array_of_array = []; 
    for(let i=0;i<2;i++){ //generate 6 indexes 
      array_index.push(String(randomAttraction()));
      //console.log(randomAttraction());
      array_index.push(String(randomBar()));
      //console.log(randomBar());   
      array_index.push(String(randomFood()));
      //console.log(randomFood()); 
    }

    for(var i=0;i<6;i++){ //get the data from db via the 6 indexes
      if(i%3==0){
        let attractRef = Firebase.firestore().collection("Attractions").doc(array_index[i]).get()
        .then(document=>{ 
          // console.log(document.data().images[0]);
          array_photos.push(String(document.data().images[0])); 
          // console.log(array_photos);
          // console.log(document.data().name);
          array_names.push(String(document.data().name));
          
        })
      }
      else if(i%3==1){
        let attractRef = Firebase.firestore().collection("Bars & Clubs").doc(array_index[i]).get()
        .then(document=>{
        //console.log(document.data().images[0]);
        array_photos.push(String(document.data().images[0]));
        //console.log(document.data().name);
        array_names.push(String(document.data().name));
        })
      }
      else{
        let attractRef = Firebase.firestore().collection("Food & Beverages").doc(array_index[i]).get()
        .then(document=>{
        console.log(document.data().images[0]);
        array_photos.push(String(document.data().images[0])); 
        // console.log(document.data().name);
        array_names.push(String(document.data().name));
        // console.log(array_photos);
        // console.log(array_names);
        })
      }
    }
    setTimeout(() => {
    console.log('Initial timeout!');
    array_of_array.push(array_photos);
    array_of_array.push(array_names); 
    console.log(array_index);
    console.log(array_names);
    console.log(array_photos);
    setRandomized(array_of_array);
    setLoading(false);
  }, 1500);


  };
  
  useEffect(()=>{
    fetchData();
  },[]);
  
  if(randomized===null){
    return null; 
  }


  //const popular = ['https://pbs.twimgi.com/profile_images/486929358120964097/gNLINY67_400x400.png','https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png']

  
  

return (
    <View style={styles.container}>
        <Text style={styles.header}>Welcome {userDetails.userName}!</Text>
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
        <View>
        <Divider width={5} color={"black"} />
        {randomized &&<Text style={styles.header2}>Our suggestions of the day!</Text>}
        <Divider width={5} color={"black"} />
        </View>

        {!loading && <SafeAreaView style={{flex:1}}>
            <ScrollView horizontal={true}>

              {!loading&&randomized[0][0]!="undefined"&&<Card style={styles.cardStyle}>
                <Card.Title>{randomized[1][0]}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={styles.imageSize}
                  source={{uri:randomized[0][0]}}
                />
              </Card>}

              {!loading&&randomized[0][1]!="undefined"&&<Card>
                <Card.Title>{randomized[1][1]}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={styles.imageSize}
                  source={{uri:randomized[0][1]}}
                />
              </Card>}

              {!loading&&randomized[0][2]!="undefined"&&<Card>
                <Card.Title>{randomized[1][2]}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={styles.imageSize}
                  source={{uri:randomized[0][2]}}
                />
              </Card>}

              {!loading&&randomized[0][3]!="undefined"&&<Card>
                <Card.Title>{randomized[1][3]}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={styles.imageSize}
                  source={{uri:randomized[0][3]}}
                />
              </Card>}
              
              {!loading&&randomized[0][4]!="undefined"&&<Card>
                <Card.Title>{randomized[1][4]}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={styles.imageSize}
                  source={{uri:randomized[0][4]}}
                />
              </Card>}

              {!loading&&randomized[0][5]!="undefined"&&<Card>
                <Card.Title>{randomized[1][5]}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={styles.imageSize}
                  source={{uri:randomized[0][5]}}
                />
              </Card>}
            </ScrollView>
        </SafeAreaView>}

        
      

        <TouchableOpacity style={styles.signOutButton} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>

          
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
  header: {
    fontSize: 30,
    padding: 20,
    fontWeight: "bold",
    color: "black",
  },
  iconsview: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop:30,
    height: "15%",
    width: "90%",
    alignContent: "center",
  },
  touchableStyle: {
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
    //bottom: 210,
    backgroundColor: "#20E3C0",
  },
  imageSize:{
    borderRadius: 5,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%', 
    height: "85%",
    aspectRatio: 1
  },
  header2:{
    fontSize: 20,
    padding:10,
    fontWeight: "bold",
    color: "black",
  },
});
