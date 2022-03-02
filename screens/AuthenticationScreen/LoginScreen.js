// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Pressable, Image, KeyboardAvoidingView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Firebase from '../database/firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
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
  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to sign in!')
    } else {
      this.setState({
        isLoading: true,
      })
      Firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Home')
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
            style={styles.loginButton} 
            title="Login"
            onPress={() => this.userLogin()}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </View> 
        <View style={styles.signupText}>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          <Text 
            style={styles.text}
          >
            Don't have account?
          </Text>
          <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>  
        <View>
          <Pressable
            style={styles.signupButton} 
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('Signup')}
          >
            <Text style={styles.loginText}>Sign Up</Text>
          </Pressable>
        </View>                             
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
    padding: 35,
    minHeight: 1000,
    backgroundColor: '#fff'
  },
  icon:{
    height: 95,
    width: 325,
    bottom: 200,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: "absolute",
    top: 10,
    height: 48,
    width: 303,
    backgroundColor: "#FF545E"
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  signupText: {
    flexDirection: 'row',
    alignItems: 'center',
    // left: 80,
    top: 100,
    height: 37,
  },
  text: {
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 110,
    height: 48,
    width: 303,
    backgroundColor: "#20E3C0"
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  rectangle: {
    height: 129,
    width: 299,
    left: 33,
    top: 327,
    position: "absolute",
    elevation: 8,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowRadius: 5, // <- Radius of the shadow
    borderRadius: 5,
    padding: 16,
    margin: 8,
    }
});