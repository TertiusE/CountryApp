import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight, ActivityIndicator,Image } from 'react-native';
import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import { setLoading } from './redux/actions/index';
import { setRefresh } from './redux/actions/index';
import MainPage from './MainPage';
import Country from './Country';

const CountryApp = ({ DATA, isLoading, refresh, setRefresh, setLoading, UpdateData }) => {
    const API = "https://restcountries.com/v2/all"
    const Stack = createStackNavigator();
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
                console.log(response);
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
            <Stack.Navigator>
                <Stack.Group screenOptions={options}>
                    <Stack.Screen name="Home" component={MainPage} />
                    <Stack.Screen name="Country" component={Country} />
                </Stack.Group>
            </Stack.Navigator>
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