import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, ScrollView, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import { UpdateData, UpdateHistory } from './redux/actions/index';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const History = ({ DATA, HISTORY, navigation }) => {
    const isFocused = useIsFocused()
    if (HISTORY.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>You have no game history</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.gameContainer}>
            <View style={styles.gameTitleView}>
                <Text style={styles.gameTitleText}>Game History</Text>
            </View>
            <View style={styles.gameScrollView}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {HISTORY.map((item) =>
                        <View key={item.date} style={[styles.borderView, styles.viewSpacing]}>
                            <Text>Score: {item.score}</Text>
                            <Text>{item.date.toString().split("(")[0]}</Text>
                        </View>
                    )}
                </ScrollView>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    gameTitleText: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 10,
        marginBottom: 0
    },
    gameContainer: {
        flex: 1,
        justifyContent: "center",
    },
    gameTitleView: {
        flex: 1
    },
    gameScrollView: {
        flex: 14
    },
    borderView: {
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth*10,
        borderRadius: StyleSheet.hairlineWidth*10,
        shadowColor: "rgba(0,0,0,0.75)",
        shadowOffset: {width: 5, height: 7},
        shadowOpacity: 0.4
    },
    viewSpacing: {
        margin: 10,
        padding: 15
    }
})

const mapDispatch = { UpdateData, UpdateHistory };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
    HISTORY: store.dataReducer.HISTORY
});

export default connect(mapState, mapDispatch)(History);