import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AhaTilbod from './components/Aha';
import HopkaupTilbod from './components/Hopkaup';


class HomeScreen extends React.Component {
  static navigationOptions={
    title: 'tilbod-dagsins',
    headerStyle:{ backgroundColor: '#cc181e'},
    headerTitleStyle:{ color: '#fff'},
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerStyle}> Aha</Text>
          <AhaTilbod/>
          <Text style={styles.headerStyle}> Hopkaup</Text>
          <HopkaupTilbod/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection:"row",
    backgroundColor: '#fff',
  },
  headerStyle: {
    flex: 1,
    paddingTop:10,
    fontWeight:'bold',
    fontSize: 18,
    // flexDirection:"row",
    // backgroundColor: '#E53935',
    height: 50,
  },
});


export default App = StackNavigator({
  Home:{screen:HomeScreen},
});
