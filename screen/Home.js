import React from 'react';
import {Text, View,TextInput,Button, Alert, ScrollView,TouchableHighlight, TouchableOpacity } from 'react-native';
import styles from '../Style'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home Screen',
  };
  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      players: []
    };
  }

  _buildTeams = () => {
    const { navigate } = this.props.navigation;
    const teams = this.state.players;
    if(this.state.players.length % 2 !== 0) {
      Alert.alert(
        'Number of players not even',
        'Can\'t generate teams for uneven number of players'
      );
    }
    else{
      navigate('Teams' , {teams : teams})
    }
  }

  _handleTextChange = (inputValue) => {
    this.setState({inputValue});
  };

  _handleButtonPress = () => {
    let p = this.state.players;
    let name = this.state.inputValue;
    if(name.trim() === '') return;
    if(p.indexOf(name) === -1){
      p.push(name);
    }
    else{
      Alert.alert(
        'Player already exist',
        name + ' already exist'
      );
    }
    this.setState({inputValue: '', players: p});

  };

  removePlayer = (index) => {
    let newPlayers = this.state.players.slice(0, index).concat(this.state.players.slice(index+1));
    this.setState({players: newPlayers});
  };

  render() {
    const players = this.state.players.map((name, index) => {
      return (
        <View key={index} style={{flexDirection: 'row', margin: 'auto', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        <Text
        style={{backgroundColor: '#f5f5f5', fontSize: 19}}
        >
        {name}
        </Text>
        <TouchableHighlight onPress={() => Alert.alert('Remove player?', 'Remove ' + name + ' from the list?' ,
        [{text: 'Yes', onPress: () => this.removePlayer(index)},
        {text: 'No' , onPress: () => console.log('cancel') , style: 'cancel'}])}>
        <Text style={{fontSize: 20}}>X</Text>
        </TouchableHighlight>
        </View>
      );
    });

    return (
      <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row-reverse'}}>
      <TextInput
      value= {this.state.inputValue}
      placeholder='Enter player name: '
      onChangeText={this._handleTextChange}
      autoFocus={true}
      style={{flex: 8}} />
      <TouchableOpacity onPress={this._handleButtonPress} style={{flex: 2, paddingBottom: 20}}>
      <Text style={{fontSize: 25, alignSelf: 'center'}}>
      +
      </Text>
      </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#f1f1f1', flex: 7, alignItems: 'center'}}>
      <Text style={{alignSelf: 'center'}}> Players: </Text>
      <ScrollView style={{width: 300, padding: 20}}>
      {players}
      </ScrollView>
      <Text style={{alignSelf: 'center'}}>#{players.length} players </Text>
      </View>
      <View style={{margin: 20, flex: 2}}>
      <Button
      title='Build'
      onPress={this._buildTeams}
      />
      </View>
      </View>
    );
  }
}
