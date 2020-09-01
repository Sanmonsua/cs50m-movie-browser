import React from 'react'
import { View, FlatList, StyleSheet, Dimensions  } from 'react-native'
import colorPalettes from '../colors'
import MovieCard from '../components/MovieCard'


export default class ResultsScreen extends React.Component {
  
    state = {
      results : {},
      page : 1,
    }
  
    renderItem = ({item, index}) =>(
      <MovieCard 
        item={item}
        navigation={this.props.navigation}
        colors={
          colorPalettes[index % colorPalettes.length]
        }
      />
    )
  
    componentDidMount = () =>{
      const request = new XMLHttpRequest();
      request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&s=${this.props.route.params.search}&page=${this.state.page}`)
  
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
      request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&s=${this.props.route.params.search}&page=${this.state.page+1}`)
  
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
        paddingHorizontal : 20,
        width :  Dimensions.get('window').width,
    },
    flatList: {
        flex : 1,
        width : "85%",
    },
})