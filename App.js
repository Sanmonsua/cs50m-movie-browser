import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import MovieCard from './MovieCard'
import { search } from './mockData'

export default class App extends React.Component {
  
  renderItem = ({item}) =>(
    <MovieCard item={item}/>
  )

  render() {
    console.log(search.Search)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Showing results for : s</Text>
        <FlatList
          style={styles.flatList}
          data={search.Search}
          renderItem={this.renderItem}
          keyExtractor={item => item.imdbID}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
