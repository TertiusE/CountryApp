import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { UpdateData } from './redux/actions/index';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';

const Country = ({ DATA, route, navigation }) => {
    const { item } = route.params
    const isUnited = item.name.search("united states")
    let [location, setLocation] = useState([37.090240,-95.712891])
    useEffect(() => {setLocation(item.latlng) }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.countryText}>{item.name}</Text>
            <View style={[styles.mapView, styles.border]}>
                <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={{ latitude: location[0], longitude: location[1], latitudeDelta: 5, longitudeDelta: 5, }} />
            </View>
            <View style={[styles.regionView, styles.border]}>
                <Text style={styles.textSize}><Text style={styles.boldText}>Region</Text>: {item.region}</Text>
                <Text style={styles.textSize}><Text style={styles.boldText}>Sub-Region</Text>: {item.subregion}</Text>
            </View>

            <View style={styles.infoView}>
                <ScrollView>
                    <View style={[styles.border, styles.format]}>
                        <Text style={[styles.boldText, styles.textSize]}>Current Population</Text>
                        <Text style={styles.number}>{item.population.toLocaleString()}</Text>
                    </View>
                    <View style={[styles.border, styles.format]}>
                        <Text style={[styles.boldText, styles.textSize]}>Surface Area</Text>
                        <Text style={styles.number}>{item.area.toLocaleString()} km²</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={[styles.border, styles.format, styles.half]}>
                            <Text style={[styles.boldText, styles.textSize]}>Calling Code</Text>
                            <Text style={styles.number}>+{item.callingCodes}</Text>
                        </View>

                        <View style={[styles.border, styles.format, styles.half]}>
                            <Text style={[styles.boldText, styles.textSize]}>Native Name</Text>
                            <Text style={styles.nativeName}>{item.nativeName}</Text>
                        </View>
                    </View>

                    <View style={[styles.border, styles.format]}>
                        <Text style={[styles.boldText, styles.textSize]}>Languages</Text>
                        {item.languages.map((info) => <Text style={styles.nativeName} key={info.name}>{info.name}</Text>)}
                    </View>
                    <View style={[styles.currencyView, styles.border, styles.format]}>
                        <Text style={[styles.boldText, styles.textSize]}>Currency</Text>
                        {item.currencies.map((info) =>
                            <View style={[styles.currency, styles.row]} key={info.name}>
                                <View style={[styles.half, styles.currencyText]}>
                                    <Text style={[styles.boldText, styles.currencyCode]}>{info.code}</Text>
                                    <Text>{info.name}</Text>
                                </View>
                                <View style={[styles.half, styles.currencySymbol]}>
                                    <Text style={styles.symbolText}>{info.symbol}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    map: {
        width: '100%',
        height: '100%'
    },
    mapView: {
        margin: 10,
        flex: 5
    },
    countryText: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 10,
        marginBottom: 0
    },
    infoView: {
        flex: 10,
        margin: 10
    },
    regionView: {
        margin: 10,
        marginTop: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent:"center",
        flexWrap: "wrap",
        padding:5

    },
    boldText: {
        fontWeight: "bold"
    },
    border: {
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderRadius: StyleSheet.hairlineWidth * 15
    },
    format: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    number: {
        fontSize: 35
    },
    textSize: {
        fontSize: 15
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    half: {
        flexBasis: "48%",
        flexGrow: 0,
        flexShrink: 1,
    },
    nativeName: {
        fontSize: 20
    },
    currency:{
        flex:1,
    },
    currencyCode:{
        fontSize: 30,
        textAlign:"center"
    },
    currencyText: {
        alignItems: "center",
        justifyContent:"center"
    },
    currencySymbol: {
        alignItems: "center",
        justifyContent:"center"
    },
    symbolText: {
        fontSize: 40
    }
})

export default connect(mapState, mapDispatch)(Country);