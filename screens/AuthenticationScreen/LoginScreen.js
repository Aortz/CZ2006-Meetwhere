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
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const checkEmailPasswordInput = (email,password) => {    
    //error handling for email
    let emailValid = false;
    if(email.length == 0){
      setEmailError("Email is required");
    }        
    else if(email.length < 6){
      setEmailError("Email should be minimum 6 characters");
    }      
    else if(email.indexOf(' ') >= 0){        
      setEmailError('Email cannot contain spaces');                          
    }
    else{
      setEmailError("")
      emailValid = true
    }
    //error handling for password
    let passwordValid = false;
    if(password.length == 0){
      setPasswordError("Password is required");
    }        
    else if(password.length < 6){
        setPasswordError("Password should be minimum 6 characters");
    }      
    else if(password.indexOf(' ') >= 0){        
        setPasswordError('Password cannot contain spaces');                          
    }
    else{
      setPasswordError("")
      passwordValid = true
    }
    if(emailValid && passwordValid){
      return true;
    }
    return false;
  }
  
  const userLogin = () => {
    setLoading(true)
    let validInput = checkEmailPasswordInput(email, password)  
    if(validInput){
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
                setUserDetails(user)
                console.log("User logged in successfully!");
              }
            });
        })
        .catch((error) =>
          Alert.alert(error.message),
          setTimeout(() => {setLoading(false)}, 2000)
          // setLoading(false) 
        )}
    else{
      setLoading(false)
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
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
        {emailError.length > 0 &&<Text style={styles.errorText}>{emailError}</Text>}
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          maxLength={15}
          secureTextEntry={true}
        />
        {passwordError.length > 0 &&<Text style={styles.errorText}>{passwordError}</Text>}
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
      <View>
        <TouchableOpacity
          style={styles.signupButton}
          title="Sign Up"
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    minHeight: 700,
    backgroundColor: "#fff",
  },
  icon: {
    height: 95,
    width: 310,
    marginBottom: 50,
    marginRight: 30,
  },
  rectangle: {
    width: 299,
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
    // top: 10,
    height: 48,
    width: 303,
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
    // left: 80,
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
    // position: 'absolute',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
