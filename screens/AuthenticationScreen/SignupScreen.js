// components/signup.js
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, addDoc } from "firebase/firestore"; 
import {Firebase, db} from "../database/firebase";


export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });

      Firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          const uid = res.user.uid
          const data = {
            email: this.state.email,
            fullName: this.state.displayName,
          };
          const usersRef = addDoc(collection(db, "Users"), data);
          console.log('User registered successfully!')
          this.setState({
            isLoading: false,
            displayName: "",
            email: "",
            password: "",
          });
          this.props.navigation.navigate("Login");
        })
        .catch((error) => Alert.alert(error.message));
    }
  };
  // componentWillMount() {
  //   // Add listener here
  //     this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {
  //       if (!user) {
  //           this.props.navigation.navigate("Login");
  //       }
  //       else{
  //         console.log("Logged In")
  //       }
  //     });
  // }

  // componentWillUnmount() {
  //     // Don't forget to unsubscribe when the component unmounts
  //     this.unsubscribe();
  // }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <Image
          style={styles.icon}
          source={require("./AuthenticationAssets/meetwhere-icon.png")}
        />
        <Text style={styles.headerText}>Registration Details</Text>
        <View style={styles.rectangle}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={this.state.displayName}
            onChangeText={(val) => this.updateInputVal(val, "displayName")}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, "email")}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, "password")}
            maxLength={15}
            secureTextEntry={true}
          />
        </View>

        <View>
          <Pressable
            style={styles.signupButton}
            title="Sign Up"
            onPress={() => this.registerUser()}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </Pressable>
        </View>
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          Already Registered? Click here to login
        </Text>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    minHeight: 700,
    backgroundColor: "#fff",
  },
  headerText: {
    width: "100%",
    // marginBottom: 10,
    // paddingBottom: 15,
    // alignSelf: "flex-end",
    // bottom: 260,
    // fontFamily: "Times New Roman",
    fontSize: 20,
  },
  icon: {
    height: 95,
    width: 325,
    display: "flex",
    marginBottom: 50,
    // alignItems: "flex-start"
  },
  rectangle: {
    // height: 190,
    // width: 299,
    display: "flex",
    justifyContent: "flex-start",
    elevation: 1,
    marginBottom: 120,
    // shadowColor: "black",
    // shadowOpacity: 0.3,
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    // shadowRadius: 3, // <- Radius of the shadow
    borderRadius: 3,
    padding: 14,
    margin: 8,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 10,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  signupText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  signupButton: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 303,
    // bottom: 210,
    backgroundColor: "#20E3C0",
  },
  loginText: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "normal",
    letterSpacing: 0.25,
    textAlign: "center",
    // bottom: 100,
    color: "blue",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
