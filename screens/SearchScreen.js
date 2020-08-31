import React from 'react'
import { Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import colorPalettes from '../colors'


export default class SearchScreen extends React.Component {

  state = {
    search : '',
    isAllowed : false,
    colors : colorPalettes[Math.floor(Math.random()*6)]
  }

  onSubmitSearch = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&s=${this.state.search}`)

    request.onload = () => {
      const data = JSON.parse(request.responseText)
      if (data.Error) {
        return Alert.alert("Error", data.Error)
      } else {
        this.props.navigation.navigate('ResultsScreen', { 
          results : data.totalResults,
          search :  this.state.search,
        })
      }
    }

    request.send()
  }

  onSearchInputChange = (text) => {
    this.setState({  
      search : text,
    })
  }

  render(){
    return (
      <LinearGradient style={styles.container} colors={this.state.colors}>
          <Text style={styles.searchTitle}>
            Discover tones of movies and series
          </Text>
          <TextInput 
            style={styles.searchInput}
            placeholder = "Search by title, imdb or year"
            placeholderTextColor = "#eee"
            onChangeText = {(text) => this.onSearchInputChange(text)}
            value = {this.state.search}
          />
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => this.onSubmitSearch()}
          >
          <Text
              style={{
              fontSize : 18,
              fontWeight : 'bold',
              }}
          >
              Search
          </Text>
          </TouchableOpacity>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical : 40,
    paddingHorizontal : 20,
    width :  Dimensions.get('window').width,
  },
  searchTitle : {
    fontSize : 35,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin : 10,
    color: 'white',
  },
  searchInput : {
    width : "90%",
    color : 'white',
    borderBottomColor : 'white',
    borderBottomWidth : 2,
    marginVertical : 40,
    fontSize : 20,
    paddingVertical : 10,
  },
  searchButton : {
    borderRadius : 25,
    backgroundColor: 'white',
    paddingHorizontal : 20,
    paddingVertical : 10,
    justifyContent : 'flex-end',
  },
});