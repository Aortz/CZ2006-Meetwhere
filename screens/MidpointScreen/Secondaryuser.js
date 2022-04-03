import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../database/firebase";

const Secondaryuser = (props) => {
  const {
    overallFilter,
    setOverallFilter,
    setShowFilter,
    setShowSecUserInput,
    navigation,
    userDetails,
  } = props;
  const [username, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (overallFilter.secondaryUser !== null) {
      setSuccessMessage(`${overallFilter.secondaryUser.userName} `);
      setUserName(overallFilter.secondaryUser.userName);
    }
  }, [overallFilter]);

  const validateUser = async () => {
    const trimmedUserName = username.trim();
    if (trimmedUserName.length === 0) {
      setErrorMessage("Please input valid username");
      return;
    }
    if (userDetails.userName === trimmedUserName) {
      setErrorMessage("Please input another user's username");
      return;
    }
    const userRef = db.collection("Users");
    const query = userRef.where("userName", "==", trimmedUserName);

    try {
      const documents = await query.get();
      if (documents.empty) {
        setErrorMessage("Please input valid username");
        return;
      }
      documents.forEach((doc) => {
        const userObj = doc.data();

        setOverallFilter({ ...overallFilter, secondaryUser: userObj });
        setShowFilter(true);
        setShowSecUserInput(false);
        setErrorMessage(null);
      });
    } catch (error) {
      setErrorMessage("Please input valid username");
      return;
    }
  };

  return (
    <View style={styles.secondaryUser}>
      <Text style={styles.userText}>
        Would you like to avoid visiting places visited by another user? If yes, input username! 
      </Text>
      <View style={styles.inputView}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserName(text)}
          value={username}
          placeholder="Enter username of the other user!"
        />
        {successMessage && (
          <Text>
            <Text style={{ fontWeight: "bold" }}>{`${successMessage}`}</Text>
            has been added!
          </Text>
        )}
      </View>

      <View style={styles.buttonRow}>

      <TouchableOpacity onPress={validateUser} style={styles.buttonAdd}>
      <Image
            style={styles.icon}
            source={require("../../assets/Visit.png")}
          />
          <Text style={styles.buttonAdd}>Add user</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setShowFilter(true);
            setShowSecUserInput(false);
            
          }}style={styles.buttonSkip}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/redcross1.png")}
          />
          <Text style={styles.buttonSkip}>No thanks!</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }
        }style={styles.buttonBack}
        >
          <Text style={styles.buttonBack}>Back</Text>
        </TouchableOpacity> */}

      </View>
    </View>
  );
};

export default Secondaryuser;

const styles = StyleSheet.create({
  secondaryUser: {
    backgroundColor: "white",
    height: "28%",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#707070",
  },
  userText: {
    fontSize: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    marginTop: 13,
    marginBottom: 10,
    paddingLeft: 8,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#ebebeb",
  },

  buttonSkip: {
    textDecorationLine: "underline",
    borderColor: "grey",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#dcdcdc",
    flexDirection : "row", 
    justifyContent : "center",
  },

  buttonAdd: {
    textDecorationLine: "underline",
    backgroundColor: "#65db60",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection : "row", 
    justifyContent : "center",
  },
  buttonBack: {
    textDecorationLine: "underline",
    backgroundColor: "#e9967a",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },


  buttonRow: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    fontSize: 13,
    color: "red",
  },
  inputView: {
    width: "90%",
    marginBottom: 10,
  },
  icon: {
    padding: 16,
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  
});

