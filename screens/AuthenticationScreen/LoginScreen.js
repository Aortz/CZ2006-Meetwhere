// components/login.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { collection, getDoc} from "firebase/firestore";
import { Firebase, db } from "../database/firebase";
import Loader from "./Loader";
// import { CirclesLoader, PulseLoader, TextLoader, DotsLoader } from 'react-native-indicator';

export default Login = ({ navigation, setUserDetails }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const testLowerCase = (str) =>
  {
    var i = 0
    var lowercase = 0;
    while(i < str.length){
      if(str[i] == str[i].toLowerCase()){
       lowercase++
      }
      i++
    }
    if(lowercase>0){
      return true
    }
    else{
      return false
    }
  }

  const testUpperCase = (str) =>
  {
    var i = 0
    var uppercase = 0;
    while(i < str.length){
      if(str[i] == str[i].toUpperCase()){
        uppercase++;
      }
      i++
    }
    if(uppercase>0){
      return true
    }
    else{
      return false
    }
  }


  const checkEmailPasswordInput = (email, password) => {
    //error handling for email
    let emailValid = false;
    if (email.length == 0) {
      setEmailError("Email is required");
    } else if (email.length < 12) {
      setEmailError("Email should be 12 characters minimum");
    }  else if (email.length > 36) {
      setEmailError("Email should be 36 characters maximum");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else if (email.indexOf(".") <= -1) {
      setEmailError("Email must contain '.'");
    } else if (email.indexOf("@") <= -1) {
      setEmailError("Email does not contain @ symbol");
    } else {
      setEmailError("");
      emailValid = true;
    }
    //error handling for password
    let passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should have a minimum of 6 characters");
    } else if (password.length > 12) {
      setPasswordError("Password should have a maximum of 12 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else if (testLowerCase(password)==false) {
      setPasswordError("Password contains no lowercase characters");
    } else if (testUpperCase(password)==false && email != "changwei9991@gmail.com" && email != "testuser@gmail.com") {
      setPasswordError("Password contains no uppercase characters");
    } else {
      setPasswordError("");
      passwordValid = true;
    }

    if (emailValid && passwordValid) {
      return true;
    }
    return false;
  };

  //function to handle user login with Firebase
  const userLogin = () => {
    setLoading(true);
    let validInput = checkEmailPasswordInput(email, password);
    if (validInput) {
      Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const uid = res.user.uid;
          const userRef = Firebase.firestore().collection("Users");
          userRef
            .doc(uid)
            .get()
            .then((firestoreDoc) => {
              if (!firestoreDoc.exists) {
                Alert.alert("User does not exist anymore.");
              } else {
                const user = firestoreDoc.data();
                setLoading(false);
                navigation.replace("Home");
                setUserDetails(user);
                console.log("User logged in successfully!");
              }
            });
        })
        .catch(
          (error) => setEmailError(error.message),
          setTimeout(() => {
            setLoading(false);
          }, 2000)
        );
    } else {
      setLoading(false);
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      keyboardShouldPersistTaps="always"
    >
      <Loader loading={loading} />
      <Image
        style={styles.icon}
        source={require("./AuthenticationAssets/meetwhere-icon.png")}
      />
      <View style={styles.rectangle}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        {emailError.length > 0 && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          maxLength={15}
          secureTextEntry={true}
        />
        {passwordError.length > 0 && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        title="Login"
        onPress={() => userLogin()}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupText}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <Text style={styles.text}>Don't have account?</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>

      <TouchableOpacity
        style={styles.signupButton}
        title="Sign Up"
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

//Styling for Login Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    minHeight: 700,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  icon: {
    height: 95,
    width: 310,
    marginBottom: 50,
  },
  rectangle: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    elevation: 1,
    borderRadius: 3,
    padding: 13,
    marginVertical: 12,
  },
  inputStyle: {
    width: "100%",
    marginVertical: 10,
    paddingBottom: 10,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: "100%",
    backgroundColor: "#FF545E",
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  signupText: {
    flexDirection: "row",
    alignItems: "center",
    top: 100,
    height: 37,
  },
  errorText: {
    color: "#FF545E",
  },
  text: {
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  signupButton: {
    alignItems: "center",
    justifyContent: "center",
    top: 110,
    height: 48,
    width: 303,
    backgroundColor: "#20E3C0",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
