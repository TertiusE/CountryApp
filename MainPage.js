import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableHighlight, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import * as Svg from 'react-native-svg';
import { useState } from 'react';

const MainPage = ({ DATA, navigation }) => {
    let [text, setText] = useState('')
    const CountryTab = ({ item }) => {
        const image_url = { uri: item.flags.png }
        if (!(item.hasOwnProperty("name")&&item.hasOwnProperty("latlng")&&item.hasOwnProperty("region")&&item.hasOwnProperty("population")&&item.hasOwnProperty("area"))){
            return (
                <TouchableHighlight style={styles.touchable}>
                    <LinearGradient style={styles.card} colors={['#FFFFFF', '#6DD5FA', '#2980B9']}>
                        <Text style={styles.countryText}>{item.name.trim().split("(")[0]}</Text>
                        <View style={styles.image}>
                            <Image style={styles.flag} source={image_url} />
                        </View>
                        <Text style={styles.region}>{item.region}</Text>
                    </LinearGradient>
                </TouchableHighlight>
            )
        }
        return (
            <TouchableHighlight style={styles.touchable} onPress={() => navigation.navigate("Country",{item:item})}>
                <LinearGradient style={styles.card} colors={['#FFFFFF', '#6DD5FA', '#2980B9']}>
                    <Text style={styles.countryText}>{item.name.trim().split("(")[0]}</Text>
                    <View style={styles.image}>
                        <Image style={styles.flag} source={image_url} />
                    </View>
                    <Text style={styles.region}>{item.region}</Text>
                </LinearGradient>
            </TouchableHighlight>
        )
    }
    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <TextInput placeholder='Search'/>
            <FlatList numColumns={2} data={DATA} renderItem={CountryTab} />
        </SafeAreaView>
    );
}

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});

const styles = StyleSheet.create({
    touchable: {
        width: "45%",
        margin: 10,
        backgroundColor: "rgba(255,255,255,0.75)",
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 6,
        borderRadius: StyleSheet.hairlineWidth * 20,

    },
    card: {
        flex:1,
        padding: 10,

    },
    countryView: {
        flex: 1
    },
    countryText: {
        fontSize: 18,
        margin: 5,
        fontWeight: "bold",
        color: "rgb(0,0,0)",

    },
    region: {
        fontSize: 16,
        margin: 5,
        fontWeight: "bold",
        color: "rgb(255,255,255)",
    },
    image: {
        flex: 1,
        alignSelf: "center",
        margin: 10,
        flexDirection: "column-reverse",
    },
    flag: {
        width: 140,
        height: 83,
        resizeMode: 'stretch',
        borderColor: "black",
        borderWidth: 5,
    }
})

export default connect(mapState, mapDispatch)(MainPage);