import React from 'react'
import { View, Text, Image, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const colorPalettes = [
    ["#84c0f0", "#83a4f8"], 
    ["#d18de7", "#c63f86"],
    ["#f5b166", "#f19f5a"],
    ["#c97ef2", "#9b80f6"],
    ["#68e8cc", "#65e2c3"],
    ["#f06591", "#e45e7a"],
]

let color = -1

function pickColorPalette(){
    color ++
    if (color >= colorPalettes.length) color = 0
    return colorPalettes[color]
}


export default MovieCard = (props) =>(
    <LinearGradient colors={pickColorPalette()} style={styles.container}>
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