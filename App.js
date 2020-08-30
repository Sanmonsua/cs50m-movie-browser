import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import MovieCard from './MovieCard'

export default class App extends React.Component {
  
  state = {
    results : {},
    search : 'star',
    page : 1,
  }

  renderItem = ({item}) =>(
    <MovieCard item={item}/>
  )

  componentDidMount = () =>{
    const request = new XMLHttpRequest();
    request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&s=${this.state.search}&page=${this.state.page}`)

    request.onload = () => {
        this.setState(
      { results : JSON.parse(request.responseText) }
    )}

    request.send()
  }

  loadNextPage = () => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&s=${this.state.search}&page=${this.state.page+1}`)

    request.onload = () => {
        const newData = JSON.parse(request.responseText).Search
        this.setState(prevState=> (
          {
            results : {
              ... prevState.results, 
              Search : prevState.results.Search.concat(newData)
            },
            page : prevState.page+1,

          })
        )
        console.log(this.state.results)
    }

    request.send()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Showing results for : {this.state.search}
        </Text>
        <FlatList
          style={styles.flatList}
          data={this.state.results.Search}
          renderItem={this.renderItem}
          keyExtractor={item => item.imdbID}
          onEndReached={() => this.loadNextPage()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop : 40,
    width :  Dimensions.get('window').width,
  },
  flatList: {
    flex : 1,
    width : "85%",
  },
  title: {
    fontSize : 24,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    margin : 10,
  }
});
