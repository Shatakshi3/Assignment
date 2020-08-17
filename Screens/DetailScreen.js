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
  Text,
  View
} from 'react-native';

export default class DetailScreen extends React.Component{

  render(){
 const { hitDetail } = this.props.route.params;

    return(
      <SafeAreaView style={styles.container}>
        <View style={{margin:10, backgroundColor:'white', borderWidth:0.5, padding:10}}>
          <Text>{JSON.stringify(hitDetail)}</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffcba4',
        alignContent:'center'
    }
});

