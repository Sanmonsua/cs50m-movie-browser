import React from 'react'
import { View, Text, Image, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default MovieCard = (props) =>(
    <LinearGradient colors={props.colors} style={styles.container}>
        <View>
            <Image
                style={styles.poster}
                source={ { uri : props.item.Poster }}
            />
        </View>
        <View style={styles.titleHolder}>
            <Text style={styles.title}>{props.item.Title}</Text>
            <Text style={styles.type}>{props.item.Type.charAt(0).toUpperCase() + props.item.Type.slice(1)}</Text>
        </View>
    </LinearGradient>
)

const styles = StyleSheet.create({
    container: {
        borderRadius : 20,
        flexDirection : 'row',
        padding : 15,
        marginVertical : 10,
        width : "100%",
        flex : 1,
        alignItems:'flex-start'
    },
    titleHolder: {
        flexWrap:'wrap', 
        alignItems:'flex-start', 
        flex:1, 
        marginHorizontal:10,
    },
    title : {
        color : 'white',
        fontSize : 17,
        fontWeight : '700',
    },
    type : {
        color : 'white',
        fontWeight : '200',
        marginVertical : 5,
    },
    poster : {
        width:50, 
        height:75, 
        borderRadius:15
    }
})