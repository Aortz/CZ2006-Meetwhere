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
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showSecUserInput, setShowSecUserInput] = useState(false);
  const [showRadius, setShowRadius] = useState(true);

  const { userOption } = props;

  useEffect(() => {
    if (userOption === "Get Random") {
      setShowSecUserInput(true);
    } else {
      setShowFilter(true);
    }
  }, []);

  // useEffect(() => {
  //   setMidPoint(props.route.params.midpoint);
  // }, []);

  // if (midPoint === null) {
  //   return null;
  // }

  const lat = 1.3521;
  const long = 103.8198;

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={{
          // latitude: midPoint.latitude,
          // longitude: midPoint.longitude,
          //-0.02
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: long,
          }}
        />
        <Circle
          key={lat + long}
          center={{ latitude: lat, longitude: long }}
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
          navigation={props.navigation}
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
