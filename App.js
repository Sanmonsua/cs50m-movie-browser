import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import MovieCard from './MovieCard'

const colorPalettes = [
  ["#84c0f0", "#83a4f8"], 
  ["#d18de7", "#c63f86"],
  ["#f5b166", "#f19f5a"],
  ["#c97ef2", "#9b80f6"],
  ["#68e8cc", "#65e2c3"],
  ["#f06591", "#e45e7a"],
]

export default class App extends React.Component {
  
  state = {
    results : {},
    search : 'star',
    page : 1,
  }

  renderItem = ({item, index}) =>(
    <MovieCard 
      item={item} 
      colors={
        colorPalettes[index % colorPalettes.length]
      }
    />
  )

  componentDidMount = () =>{
    const request = new XMLHttpRequest();
    request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&s=${this.state.search}&page=${this.state.page}`)

    request.onload = () => {
      const data = JSON.parse(request.responseText)
      if (data.Response === "True"){
        this.setState({ 
          results : data,  
        })
      }
    }

    request.send()
  }

  loadNextPage = () => {
    const request = new XMLHttpRequest();
    request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&s=${this.state.search}&page=${this.state.page+1}`)

    request.onload = () => {
        const data = JSON.parse(request.responseText)
        if (data.Response === "True"){
          this.setState(prevState=> (
            {
              results : {
                ... prevState.results, 
                Search : prevState.results.Search.concat(data.Search)
              },
              page : prevState.page + 1,
  
            }))
        }   
    }

    request.send()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.state.results.totalResults} results for "{this.state.search}"
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
