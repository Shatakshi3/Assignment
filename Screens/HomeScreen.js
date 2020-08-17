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
  View,
  Text,
  FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component{
  state={
    hits:[],
    page:0
  }
  getInfo(){
    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`)

    .then((response) => response.json())
    .then((json) => {
      var data2 = this.state.hits.concat(json.hits)
    this.setState({
      hits:data2,
      page: (this.state.page) + 1
    })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentDidMount(){
    this.timer = setInterval(()=> this.getInfo(), 10000)
    }
    
    componentWillUnmount() {
      clearInterval(this.timer)
      this.timer = null; 
    }
    
  render(){
    if(this.state.hits.length>0){
    return(
      <SafeAreaView style={styles.container}>
      <FlatList
      keyExtractor={(items,index)=> index.toString()}
      data={this.state.hits}
      renderItem={(items)=>{
        return( 
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail',{
            hitDetail:items
          })}>
          <View style={styles.textViewStyle}>
          <Text style={{fontWeight:"bold"}}>{items.item.title}</Text>
          <Text>URL: {items.item.url}</Text>
          <Text>Author: {items.item.author}</Text>
          <Text>Created Date: {items.item.created_at}</Text>
          </View>
          </TouchableOpacity>
          )
      
      }}
      
      />
      
      </SafeAreaView>
    )
  }

else
{
   return(    
       <SafeAreaView style={styles.container}>

      <Text style={{textAlign:'center',fontSize:20,color:'white', alignItems:'center'}}>Loading...</Text>
      </SafeAreaView>
      )
}
}
}

const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#ffcba4',
  justifyContent:'center'

  
},
textViewStyle:{
  margin:10, 
  borderColor:'black', 
  borderWidth:0.5, 
  backgroundColor:'white',
  minHeight:100,
  padding:10
}
});

