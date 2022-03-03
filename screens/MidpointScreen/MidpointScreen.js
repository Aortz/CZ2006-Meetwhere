import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import { Slider, Icon } from "react-native-elements";

const MidpointScreen = (props) => {
  const [midPoint, setMidPoint] = useState(null);
  const [radius, setRadius] = useState(1000);

  useEffect(() => {
    console.log(props.userOption);
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
          radius={radius}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
      </MapView>

      <View style={styles.slider}>
        <View style={styles.textView}>
          <Text style={styles.radiusText}>{`Radius: ${radius}m`}</Text>
        </View>

        <Slider
          minimumValue={0}
          maximumValue={5000}
          value={radius}
          onValueChange={(value) => setRadius(value)}
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
  },
  textView: {
    backgroundColor: "white",
  },
});
