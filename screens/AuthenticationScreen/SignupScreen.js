// components/signup.js
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { collection, addDoc } from "firebase/firestore";
import { Firebase, db } from "../database/firebase";
import Loader from "./Loader";

export default Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const checkEmailPasswordInput = (displayName, email, password) => {
    const usersRef = db.collection("Users");

    //error handling for name
    let nameValid = false;
    usersRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => Username: ", doc.data().userName, "displayName: ", displayName);
        if (displayName == doc.data().userName) {
          setNameError("Username already exists");
        }
      });
    });
    if (displayName.length == 0) {
      setNameError("Username is required");
    } else if (displayName.indexOf(" ") >= 0) {
      setNameError("Username cannot contain spaces");
    } else {
      setNameError("");
      nameValid = true;
    }

    //error handling for email
    let emailValid = false;
    usersRef.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => Username: ", doc.data().userName, "displayName: ", displayName);
        if (email == doc.data().email) {
          setEmailError("Email already exists");
        }
      });
    });
    if (email.length == 0) {
      setEmailError("Email is required");
    } else if (email.length < 6) {
      setEmailError("Email should be minimum 6 characters");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email cannot contain spaces");
    } else {
      setEmailError("");
      emailValid = true;
    }
    //error handling for password
    let passwordValid = false;
    if (password.length == 0) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password cannot contain spaces");
    } else {
      setPasswordError("");
      passwordValid = true;
    }
    if (nameValid && emailValid && passwordValid) {
      return true;
    }
    return false;
  };

  const registerUser = () => {
    setLoading(true);
    let validInput = checkEmailPasswordInput(displayName, email, password);
    if (validInput) {
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const uid = res.user.uid;
          const data = {
            id: uid,
            email: email,
            userName: displayName,
            history: [],
          };
          const usersRef = db.collection("Users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.navigate("Login");
            })
            .catch((error) => {
              alert(error);
            });
          console.log("User registered successfully!");
        })
        .catch(
          (error) => Alert.alert(error.message),
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
      <Text style={styles.headerText}>Registration Details</Text>
      <View style={styles.rectangle}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={displayName}
          onChangeText={(displayName) => setDisplayName(displayName)}
        />
        {nameError.length > 0 && (
          <Text style={styles.errorText}>{nameError}</Text>
        )}
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
        style={styles.signupButton}
        title="Sign Up"
        onPress={() => registerUser()}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text
        style={styles.loginText}
        onPress={() => navigation.replace("Login")}
      >
        Already Registered? Click here to login
      </Text>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    minHeight: 700,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
  },
  headerText: {
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
    width: 299,
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
    marginTop: 8,
  },
  inputStyle: {
    width: "100%",
    marginBottom: 10,
    paddingBottom: 10,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
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
  errorText: {
    color: "#FF545E",
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
