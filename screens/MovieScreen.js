import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { movie } from '../mockData'
import { LinearGradient } from 'expo-linear-gradient';
import colorPalettes from '../colors'


export default class MovieScreen extends React.Component {
    render() {
        return (
            <ScrollView style={{flex:1}}>
                <LinearGradient colors={this.props.route.params.colors} style={styles.container}>
                <View style={styles.titleContainer}>
                    <Image
                        style={styles.poster}
                        source={ { uri : movie.Poster }}
                    />
                    <View>
                        <Text style={styles.title}>
                            {movie.Title}
                        </Text>
                        <Text style={styles.text}>
                            by {movie.Director}
                        </Text>
                    </View>
                    
                </View>
                <View style={{... styles.rowContainer, justifyContent:'space-between'}}>
                    <View >
                        <Text style={{... styles.text, fontWeight:'bold'}}>Length</Text>
                        <Text style={styles.subtitle}>{movie.Runtime}</Text>
                    </View>
                    <View >
                        <Text style={{... styles.text, fontWeight:'bold'}}>Language</Text>
                        <Text style={styles.subtitle}>{movie.Language}</Text>
                    </View>
                    <View >
                        <Text style={{... styles.text, fontWeight:'bold'}}>Year</Text>
                        <Text style={styles.subtitle}>{movie.Year}</Text>
                    </View>
                </View>
                <View style={styles.overview}>
                    <Text style={styles.subtitle}>Overview</Text>
                    <Text style={styles.text}>{movie.Plot}</Text>
                    
                </View>
                <View style={styles.overview}>
                    <Text style={styles.subtitle}>Cast</Text>
                    <Text style={styles.text}>{movie.Actors}</Text>
                    
                </View>
                <View style={styles.rowContainer}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{... styles.text, fontWeight:'bold'}}>IMDb</Text>
                        <Text style={styles.title}>{movie.imdbRating} / 10</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{... styles.text, fontWeight:'bold'}}>Metacritic</Text>
                        <Text style={styles.title}>{movie.Metascore} / 100</Text>
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
        marginTop : 40,
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