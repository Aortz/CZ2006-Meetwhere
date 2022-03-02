// components/login.js
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Firebase from '../database/firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ['User History'],
      DataTable: [
        ['User History is Empty'],
      ]
    }
  }
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={styles.border}>
            <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.headerText}/>
            <Rows data={state.DataTable} textStyle={styles.TableText}/>
            <Image
                style={styles.icon}
                source={require('../AuthenticationScreen/AuthenticationAssets/meetwhere-icon.png')}
            />
        </Table>
      </View>
    );
  };
};

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
  border: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      borderColor: "black",
      borderWidth: 2,
    },
  HeadStyle: { 
      height: 50,
      bottom: 200,
      alignContent: "center",
      borderRadius: 1,
      backgroundColor: '#ffe0f0'
  },
  headerText: {
    fontFamily: "Stencil Std",
    fontSize: 30
  },
  TableText: { 
    margin: 10,
    fontFamily: "Apple Chancery",
    fontSize: 24
  },
  icon:{
    height: 95,
    width: 325,
    top: 200,
  },
});
