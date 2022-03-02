import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const MidpointScreen = (props) => {
  const [midPoint, setMidPoint] = useState(null);

  useEffect(() => {
    setMidPoint(props.route.params.midpoint);
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
      </MapView>
    </View>
  );
};

export default MidpointScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
