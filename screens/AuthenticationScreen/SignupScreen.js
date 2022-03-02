// components/signup.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Firebase from '../database/firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    }
    else {
      this.setState({
        isLoading: true,
      })
      Firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
        <KeyboardAwareScrollView 
          contentContainerStyle={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <Image 
            style={styles.icon}
            source={require('./AuthenticationAssets/meetwhere-icon.png')} 
          />  
          <View style={styles.rectangle}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Name"
                value={this.state.displayName}
                onChangeText={(val) => this.updateInputVal(val, 'displayName')}
            />   
            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />
          </View>   

          <View>
            <Pressable
              style={styles.signupButton} 
              title="Sign Up"
              onPress={() => this.registerUser()}
            >
              <Text style={styles.signupText}>Sign Up</Text>
            </Pressable>
          </View>
          <Text 
            style={styles.loginText}
            onPress={() => this.props.navigation.navigate('Login')}>
            Already Registered? Click here to login
          </Text>                               
        </KeyboardAwareScrollView>
      );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        minHeight: 1000,
        backgroundColor: '#fff'
    },
    icon:{
        height: 95,
        width: 325,
        bottom: 300,
    },
    // rectangle: {
    //     height: 129,
    //     width: 299,
    //     // left: 33,
    //     top: 327,
    //     elevation: 8,
    //     shadowColor: 'black',
    //     shadowOpacity: 0.3,
    //     shadowOffset: {
    //       width: 2,
    //       height: 2
    //     },
    //     shadowRadius: 5, // <- Radius of the shadow
    //     borderRadius: 5,
    //     padding: 16,
    //     margin: 8,
    // },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
        bottom: 250,
    },
    signupText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    signupButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        width: 303,
        bottom: 210,
        backgroundColor: "#20E3C0"
    },
    loginText: {
        fontSize: 13,
        lineHeight: 21,
        fontWeight: 'normal',
        letterSpacing: 0.25,
        textAlign: 'center',
        bottom: 100,
        color: 'blue',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});