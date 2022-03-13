import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import { Slider, Icon } from "react-native-elements";
import Secondaryuser from "./Secondaryuser";
import Filter from "./Filter";

const MidpointScreen = (props) => {
  const [midPoint, setMidPoint] = useState(null);
  const [overallFilter, setOverallFilter] = useState({
    radius: 1000,
    secondaryUser: null,
    foodType: [],
    attractionType: [],
    barClubType: [],
    maxPrice: 0,
    midPoint: {
      latitude: 1.3048,
      longitude: 103.8318,
    },
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showSecUserInput, setShowSecUserInput] = useState(false);
  const [showRadius, setShowRadius] = useState(true);

  const { userOption, navigation, userDetails } = props;

  useEffect(() => {
    if (userOption === "Get Random") {
      setShowSecUserInput(true);
    } else {
      setShowFilter(true);
    }
  }, []);

  useEffect(() => {
    setMidPoint(props.route.params.midpoint);
    setOverallFilter((prevState) => ({
      ...prevState,
      midPoint: props.route.params.midpoint,
    }));
  }, []);

  if (midPoint === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={{
          // latitude: midPoint.latitude,
          // longitude: midPoint.longitude,
          //-0.02
          latitude: midPoint.latitude,
          longitude: midPoint.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: midPoint.latitude,
            longitude: midPoint.longitude,
          }}
        />
        <Circle
          key={midPoint.latitude + midPoint.longitude}
          center={{
            latitude: midPoint.latitude,
            longitude: midPoint.longitude,
          }}
          radius={overallFilter.radius}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
      </MapView>

      {showRadius && (
        <View style={styles.slider}>
          <View style={styles.textView}>
            <Text
              style={styles.radiusText}
            >{`Radius: ${overallFilter.radius}m`}</Text>
          </View>

          <Slider
            minimumValue={0}
            maximumValue={5000}
            value={overallFilter.radius}
            onValueChange={(value) =>
              setOverallFilter({ ...overallFilter, radius: value })
            }
            step={1}
            allowTouchTrack
            style={{ width: "80%" }}
            trackStyle={{ height: 5 }}
            thumbStyle={{
              height: 10,
              width: 10,
              backgroundColor: "red",
            }}
            thumbProps={{
              children: (
                <Icon
                  name="circle-thin"
                  type="font-awesome"
                  size={10}
                  reverse
                  containerStyle={{ bottom: 15, right: 20 }}
                  color="grey"
                />
              ),
            }}
            maximumTrackTintColor={"white"}
            minimumTrackTintColor={"red"}
          />
        </View>
      )}

      {showSecUserInput && (
        <Secondaryuser
          overallFilter={overallFilter}
          setOverallFilter={setOverallFilter}
          setShowFilter={setShowFilter}
          setShowSecUserInput={setShowSecUserInput}
          navigation={props.navigation}
          setShowRadius={setShowRadius}
        />
      )}

      {showFilter && (
        <Filter
          setShowFilter={setShowFilter}
          setShowSecUserInput={setShowSecUserInput}
          overallFilter={overallFilter}
          setOverallFilter={setOverallFilter}
          userOption={userOption}
          navigation={navigation}
          userDetails={userDetails}
          setShowRadius={setShowRadius}
        />
      )}
    </View>
  );
};

export default MidpointScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  slider: {
    alignItems: "center",
  },
  radiusText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  textView: {
    backgroundColor: "white",
  },
});
