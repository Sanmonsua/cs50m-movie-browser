import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';


export default class MovieScreen extends React.Component {
    
    state = {
        loaded : false,
    }

    componentDidMount(){
        const request = new XMLHttpRequest()
        request.open('GET', `https://www.omdbapi.com/?apikey=55c7fd4a&i=${this.props.route.params.imdbID}`)
  
        request.onload = () => {
            const data = JSON.parse(request.responseText)
            if (data.Response === "True"){
                this.setState({
                    poster : data.Poster,
                    title : data.Title,
                    director : data.Director,
                    runtime : data.Runtime,
                    language : data.Language.split(',').length > 1 ? data.Language.split(',')[0] : data.Language,
                    year : data.Year,
                    actors : data.Actors,
                    plot : data.Plot,
                    imdbRating : data.imdbRating,
                    metascore : data.Metascore,
                    loaded : true,
                })
            }
        }
    
        request.send()
    }

    render() {
        if (!this.state.loaded) return <View></View>
        return (
            <ScrollView style={{flex:1}}>
                <LinearGradient colors={this.props.route.params.colors} style={styles.container}>
                <View style={styles.titleContainer}>
                    <Image
                        style={styles.poster}
                        source={ { uri : this.state.poster }}
                    />
                    <View>
                        <Text style={styles.title}>
                            {this.state.title}
                        </Text>
                        <Text style={styles.text}>
                            by {this.state.director}
                        </Text>
                    </View>
                    
                </View>
                <View style={{... styles.rowContainer, justifyContent:'space-between'}}>
                    <View >
                        <Text style={{... styles.text, fontWeight:'bold'}}>Length</Text>
                        <Text style={styles.subtitle}>{this.state.runtime}</Text>
                    </View>
                    <View >
                        <Text style={{... styles.text, fontWeight:'bold'}}>Language</Text>
                        <Text style={styles.subtitle}>{this.state.language}</Text>
                    </View>
                    <View >
                        <Text style={{... styles.text, fontWeight:'bold'}}>Year</Text>
                        <Text style={styles.subtitle}>{this.state.year}</Text>
                    </View>
                </View>
                <View style={styles.overview}>
                    <Text style={styles.subtitle}>Overview</Text>
                    <Text style={styles.text}>{this.state.plot}</Text>
                    
                </View>
                <View style={styles.overview}>
                    <Text style={styles.subtitle}>Cast</Text>
                    <Text style={styles.text}>{this.state.actors}</Text>
                    
                </View>
                <View style={styles.rowContainer}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{... styles.text, fontWeight:'bold'}}>IMDb</Text>
                        <Text style={styles.title}>{this.state.imdbRating} / 10</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{... styles.text, fontWeight:'bold'}}>Metacritic</Text>
                        <Text style={styles.title}>{this.state.metascore} / 100</Text>
                    </View>
                </View>
                
            </LinearGradient>
            </ScrollView>
            
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : '#fafafa',
        padding : 40,
        width :  Dimensions.get('window').width,
        height : Dimensions.get('window').height,
    },
    rowContainer : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginVertical : 20,
    },
    titleContainer : {
        flexDirection : 'row',
        width : "80%",
    },
    overview: {
        marginTop : 20, 
    },
    subtitle: {
        fontSize : 22,
        fontWeight : 'bold',
        marginVertical : 10,
        color : 'white',
    },
    title : {
        fontSize : 27,
        fontWeight : 'bold',
        color : 'white',
    },
    text : {
        color : '#eee',
        fontSize : 17,
    },
    poster : {
        width:70, 
        height:70, 
        borderRadius:50,
        marginRight : 20,
    }
})