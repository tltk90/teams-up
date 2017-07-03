import React from 'react';
import { Text, View,Button, Alert, ScrollView } from 'react-native';
import styles from '../Style';
const equal = require('array-equal');
const perm = require('array-permutation');

/**
* The screen that show all combaination of the players.
*/
export default class Teams extends React.Component{
  static navigationOptions = {
    title: 'teams generation',
  };

  constructor(props){
    super(props);

    this.state= {
      teams : [],
      prevteams : [],
      nomoreteams: false,
    }
  }

  componentWillMount() {
    this._generateTeams();
  }


   _generateTeams = () => {

        const teams = this.props.navigation.state.params.teams;
       const half = teams.length/2;
       const permutation = perm(teams);
       this._buildJustOneTeam(permutation, half);
    }

    _buildJustOneTeam = (allTeams, half) => {
      let _teams = [];
      for(team of allTeams){
        let first = team.slice(0, half).sort();
        let second = team.slice(half).sort();
        let ok = true;
        for(t of _teams){
          if(!ok) break;
          if(equal(t.first, first) || equal(t.first, second) || equal(t.second, first) || equal(t.second, second)) ok = false;
        }
        if(ok){
          _teams.push({first: first, second: second});
        }
      }

      this.setState({teams: _teams});
    }



  _teamsUp = () => {
    let teams = this.state.teams;
    if(teams.length === 0 ){
      this.setState({nomoreteams : true});
      Alert.alert('All teams are played',
    'all combaination were played');
    }
    else{
      let prevTeams = this.state.prevteams;
      prevTeams.push(teams.pop());
      this.setState({teams: teams, prevteams: prevTeams});
      //this.refs.scroll.scrollTo({x:0, y: 200, animated: false});
    }
  }
  render(){

      const teams = this.state.prevteams.map((arr, index) => {

        return(
          <Text key={index} style={{backgroundColor: '#eef011', padding: 5, margin: 10}}>
          First Team : {arr.first.toString()} {"\n"}Second Team: {arr.second.toString()}
          </Text>
        )
      });


      return(
        <View style={styles.container}>
        <View style={{flex: 8}}>
        <ScrollView ref='scroll'
        onContentSizeChange={(w,h) => this.refs.scroll.scrollTo({x:0, y: h, animated: true})}>
        {teams}
        </ScrollView>
        </View>
        <View style={{flex: 2}}>
        <Button
        title='teams up'
        onPress={this._teamsUp}
        disabled={this.state.nomoreteams} />
        </View>
        </View>
      )
  }
}
