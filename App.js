import React from 'react';
import { StyleSheet, Text, View,TextInput,Button, Alert, ScrollView,TouchableHighlight, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from './Style';
import HomeScreen from './screen/Home';
import Teams from './screen/Teams';


const AppStack = StackNavigator({
  Home: {screen: HomeScreen },
  Teams: {screen: Teams},
});

export default class App extends React.Component{
  render(){
    return <AppStack style={{paddingTop: 24}}/>;
  }
}
