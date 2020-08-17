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
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component{
//   constructor(){
//     super();
//   this.page = 0
// }
  state={
    hits:[],
    page:0
  }
  getInfo(){
    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`)

    .then((response) => response.json())
    .then((json) => {
      // console.log( json.hits);
      var data= this.state.hits.concat(json.hits)
      if (json.hits !== ''){
// this.setState({
  // hits:json.hits
  // hits: [ ...this.state.hits, json.hits]
  // this.setState(prevState => ({ hits: [...prevState.hits, json.hits] }))
  this.setState({hits:data})

  // hits: this.state.hits.concat(json.hits)

// })
this.setState({
  page: (this.state.page) + 1
})
      }
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
    // renderHits = this.state.hits.map(hit=>{
    if(this.state.hits.length>0){
    return(
      <SafeAreaView style={styles.container}>
      <FlatList
      keyExtractor={(items)=> items.objectID}

      data={this.state.hits}
      renderItem={({item})=>{
        return( 
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail',{
            hitDetail:item
          })}>
           {/* // {console.log(items)} */}
          <View style={styles.textViewStyle}>
          <Text style={{fontWeight:"bold"}}>{item.title}</Text>
          <Text>URL: {item.url}</Text>
          <Text>Author: {item.author}</Text>
          <Text>Created Date: {item.created_at}</Text>
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

