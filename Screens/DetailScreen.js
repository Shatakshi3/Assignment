/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

export default class DetailScreen extends React.Component{

  render(){
    // renderHits = this.state.hits.map(hit=>{
 const { hitDetail } = this.props.route.params;

    return(
      <SafeAreaView style={styles.container}>
          <Text> {JSON.stringify(hitDetail)}</Text>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffcba4',
    }
});

