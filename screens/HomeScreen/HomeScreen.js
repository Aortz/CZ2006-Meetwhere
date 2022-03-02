<<<<<<< HEAD
import React from "react";
import { StyleSheet, Text, View,Image,TouchableOpacity } from "react-native";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";





const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to MeetWhere!</Text>
      <View style={styles.iconsview}>
        <TouchableOpacity style={styles.touchableStyle} onPress={() => navigation.navigate('RandomLocation')}>
          <Image
            source={require('../../assets/random_location.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableStyle} onPress={() => navigation.navigate('SuggestedLocation')}>
          <Image
            source={require('../../assets/suggested_list.png')}
            style={styles.icon}
        
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableStyle} onPress={() => navigation.navigate('History')}>
          <Image
            source={require('../../assets/history.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

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
        backgroundColor: '#fff',
        alignItems: "center"
  },
  icon:{
    height: 80,
    width: 80
  },
  header:{
    fontSize:30,
    padding:10,
    fontWeight:"bold", 
    color:"black"
  },
  iconsview:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:15,
    height:200,
    borderWidth:5,
    width:"90%"
  },
  touchableStyle:{
    height:"60%",
    justifyContent:'center'
  },
});
=======
>>>>>>> Authentication
