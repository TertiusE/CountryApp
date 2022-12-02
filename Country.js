import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, ScrollView, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import { UpdateData } from './redux/actions/index';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Country = ({ DATA, route, navigation }) => {
    const { item } = route.params
    let [location, setLocation] = useState([37.090240, -95.712891])
    let [mapModal, setModal] = useState(false)

    const isFocused = useIsFocused()
    const FullView = () => {
        return (
            <Modal animationType='slide' transparent={false} visible={mapModal} >
                <SafeAreaView style={styles.container}>
                    <View style={styles.modalTitleView}>
                        <Text style={styles.modalTitle}>Full Map View</Text>
                    </View>
                    <View style={[styles.mapModalView, styles.border]}>
                        <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={{ latitude: location[0], longitude: location[1], latitudeDelta: 5, longitudeDelta: 5, }} />
                    </View>
                    <TouchableHighlight underlayColor="red" style={[styles.border, styles.modalButton]} onPress={() => { setModal(!mapModal) }}>
                        <Text style={styles.modalText}>Close Map</Text>
                    </TouchableHighlight>
                </SafeAreaView>
            </Modal>
        )

    }
    useEffect(() => {
        setLocation(item.latlng)
    }, [isFocused])
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.header]}>
                <View style={styles.countryView}>
                    <Text style={styles.countryText}>{item.name}</Text>
                </View>
                <TouchableWithoutFeedback style={styles.countryView} onPress={() => { setModal(!mapModal) }}>
                    <AntDesign suppressHighlighting={true} name="infocirlce" size={24} color="black" />
                </TouchableWithoutFeedback>
            </View>
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
            <FullView />
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
        alignContent: "center",
        flexWrap: "wrap",
        padding: 5
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
    currency: {
        flex: 1,
    },
    currencyCode: {
        fontSize: 30,
        textAlign: "center"
    },
    currencyText: {
        alignItems: "center",
        justifyContent: "center"
    },
    currencySymbol: {
        alignItems: "center",
        justifyContent: "center"
    },
    symbolText: {
        fontSize: 40
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10
    },
    mapModalView: {
        flex: 12,
        margin: 10
    },
    modalButton: {
        flex: 1,
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    modalText: {
        fontSize: 25,
        fontWeight: "bold"
    },
    modalTitleView: {
        flex: 1
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 10
    }


})

export default connect(mapState, mapDispatch)(Country);