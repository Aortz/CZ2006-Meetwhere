import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
        Would you like to take into account another user's location history
      </Text>
      <View style={styles.inputView}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUserName(text)}
          value={username}
          placeholder="Enter username"
        />
        {successMessage && (
          <Text>
            <Text style={{ fontWeight: "bold" }}>{`${successMessage}`}</Text>
            has been added!
          </Text>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => {
            setShowFilter(true);
            setShowSecUserInput(false);
            setShowRadius(false);
          }}style={styles.buttonSkip}
        >
          <Text style={styles.buttonSkip}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }
        }style={styles.buttonBack}
        >
          <Text style={styles.buttonBack}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={validateUser} style={styles.buttonAdd}>
          <Text style={styles.buttonAdd}>Add user</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Secondaryuser;

const styles = StyleSheet.create({
  secondaryUser: {
    backgroundColor: "white",
    height: "30%",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: "#707070",
  },
  userText: {
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    marginTop: 13,
    marginBottom: 5,
    paddingLeft: 8,
    borderWidth: 1,

    borderRadius: 15,
    backgroundColor: "#DCDCDC",
  },

  buttonSkip: {
    textDecorationLine: "underline",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#dcdcdc",
  },

  buttonAdd: {
    textDecorationLine: "underline",
    backgroundColor: "#8fbc8f",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  buttonBack: {
    textDecorationLine: "underline",
    backgroundColor: "#e9967a",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 12,
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
    marginBottom: 15,
  },
});

