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
    setShowRadius,
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
    const userRef = db.collection("Users");
    const query = userRef.where("userName", "==", trimmedUserName);

    // Check if secondary username not same as current username

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
        setShowRadius(false);
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
          }}
        >
          <Text style={styles.buttonSkip}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonSkip}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={validateUser} style={styles.buttonAdd}>
          <Text style={styles.buttonText}>Add user</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Secondaryuser;

const styles = StyleSheet.create({
  secondaryUser: {
    backgroundColor: "white",
    height: "33%",
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
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 8,
    borderWidth: 1,

    borderRadius: 15,
    backgroundColor: "#DCDCDC",
  },
  buttonSkip: {
    textDecorationLine: "underline",
  },
  buttonAdd: {
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
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
    marginBottom: 13,
  },
});
