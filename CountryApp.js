import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import { setLoading } from './redux/actions/index';
import { setRefresh } from './redux/actions/index';
import MainPage from './MainPage';
import Country from './Country';
import Game from './Game';

const CountryApp = ({ DATA, isLoading, refresh, setRefresh, setLoading, UpdateData }) => {
    const API = "https://restcountries.com/v2/all"
    const Tab = createBottomTabNavigator();
    const [canada, setCanada] = useState({})

    const options = ({ navigation }) => ({
        headerRight: (props) => <TouchableHighlight onPress={() => { setRefresh(!refresh) }}><Image style={{ marginRight: 10 }} source={require("./assets/refresh.png")} /></TouchableHighlight>
    })

    const fetchData = () => {
        setLoading(true);
        fetch(API)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();

            }).then(response => {
                UpdateData(response);
                setCanada(response.filter(item => item.name.toLowerCase() == 'canada')[0])
                setTimeout(() => { setLoading(false) }, 1000)

            }).catch((error) => {
                if (error.text) {
                    error.text().then(errorMessage => { })
                }
            })
    }
    useEffect(() => {
        fetchData()
    }, [refresh])

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#C33764" />
            </SafeAreaView>
        );
    }

    return (

        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen options={{ headerShown: false }} name="Home" component={MainPage} />
                <Tab.Screen options={{ headerShown: false }} name="Country" component={Country} initialParams={{item:canada}}/>
                <Tab.Screen options={{ headerShown: false }} name="Game" component={Game}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const mapDispatch = { UpdateData, setLoading, setRefresh };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
    isLoading: store.dataReducer.isLoading,
    refresh: store.dataReducer.refresh
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});


export default connect(mapState, mapDispatch)(CountryApp);