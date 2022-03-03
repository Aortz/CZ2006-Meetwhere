// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Pressable, Image, KeyboardAvoidingView } from 'react-native';

export default class SplashScreen extends Component {
    render() {
        return(
        <View style={styles.container}>
            <Image
                style={styles.icon}
                source={require('../AuthenticationScreen/AuthenticationAssets/meetwhere-icon.png')}
            />
            <ActivityIndicator/>
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      minHeight: 700,
      backgroundColor: '#fff'
    },
    icon:{
      height: 95,
      width: 325,
    },
})