import React, { Component } from 'react';
import { Alert, TouchableHighlight, StyleSheet,Linking, ActivityIndicator, ListView, Text, View, Image } from 'react-native';

export default class AhaTilbod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://10.11.44.101:3000/aha')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'column', paddingTop: 0}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
            return(
            <View style={styles.showContainer}>
              <TouchableHighlight onPress={() => { Linking.openURL(rowData.link) }}>
              <Image
                style={{width: 400, height: 250}}
                source={{uri:rowData.image}}>
                <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)' ,height:50, top: 150}}>
                    <Text style={styles.titleStyle}>
                      {rowData.title}
                    </Text>

                </View>
                <View>
                  <Text style={styles.priceStyle}>
                    {rowData.price}
                  </Text>
                </View>
              </Image>
              </TouchableHighlight>
            </View>
          );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showContainer: {
    flex: 1,
    flexDirection:"column",
  },

  titleStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    color:'white'
  },

priceStyle: {
  color:'#fff',
  fontWeight: 'bold',
  fontSize: 14,
  paddingTop:10,
  paddingLeft:10,
  paddingRight:10
},

});
