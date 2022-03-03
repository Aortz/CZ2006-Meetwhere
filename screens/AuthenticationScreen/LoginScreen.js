// components/login.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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

  const userLogin = () => {
    setLoading(true);
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
      .catch((error) => Alert.alert(error.message), setLoading(false));
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
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          maxLength={15}
          secureTextEntry={true}
        />
      </View>

      <View>
        <Pressable
          style={styles.loginButton}
          title="Login"
          onPress={() => userLogin()}
        >
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </View>
      <View style={styles.signupText}>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        <Text style={styles.text}>Don't have account?</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
      </View>
      <View>
        <Pressable
          style={styles.signupButton}
          title="Sign Up"
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </Pressable>
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
