import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableHighlight, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import * as Svg from 'react-native-svg';
import { useState } from 'react';

const MainPage = ({ DATA, navigation }) => {
    let [text, setText] = useState('')
    let [localData, setLocal] = useState(DATA)
    let filterList = (input) => {
        setText(input)
        let value = input.toLowerCase()
        text.length <= 1 ? setLocal(DATA) :
        setLocal(localData.filter((item)=>{return item.name.toLowerCase().includes(value)||item.region.toLowerCase().includes(value)||item.subregion.toLowerCase().includes(value)}))
    }
    const CountryTab = ({ item }) => {
        const image_url = { uri: item.flags.png }
        let toCountry = () => {navigation.navigate("Country",{item:item})}
        if (!(item.hasOwnProperty("name")&&item.hasOwnProperty("latlng")&&item.hasOwnProperty("region")&&item.hasOwnProperty("population")&&item.hasOwnProperty("area"))){
            toCountry = () => {}
        }
        return (
            <TouchableHighlight style={styles.touchable} onPress={toCountry}>
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
        <SafeAreaView style={{ backgroundColor: "white", flex:1 }}>
            <View style={styles.inputView}>
            <TextInput value={text} onChangeText={(value)=>{filterList(value)}} style={styles.input} placeholder='Search'/>
            </View>
            <FlatList numColumns={2} data={localData} renderItem={CountryTab} />
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
    },
    input: {
        padding: 20,
        borderRadius: StyleSheet.hairlineWidth * 30,
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 10,
        margin: 10,
        position: "relative"
    }
})

export default connect(mapState, mapDispatch)(MainPage);