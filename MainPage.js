import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import * as Svg from 'react-native-svg';

const MainPage = ({ DATA, navigation }) => {
    const CountryTab = ({ item }) => {
        const image_url = { uri: item.flags.png }
        //numColumns={2}
        return (
            <LinearGradient style={styles.card} colors={['#FFFFFF', '#6DD5FA','#2980B9']}>
                <Text style={styles.countryText}>{item.name.trim().split("(")[0]}</Text>
                <View style={styles.image}>
                    <Image style={styles.flag} source={image_url} />
                </View>
                <Text style={styles.region}>{item.region}</Text>
            </LinearGradient>
        )
    }
    return (
        <SafeAreaView style={{backgroundColor:"white"}}>
            <FlatList numColumns={2} data={DATA} renderItem={CountryTab} />
        </SafeAreaView>
    );
}

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255,255,255,0.75)",
        margin: 10,
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 5,
        borderRadius: StyleSheet.hairlineWidth * 20,
        padding: 10,
        width: "45%",
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
    image : {
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