import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableHighlight, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash';



const Game = ({ DATA, navigation }) => {
    let [score, setScore] = useState(0)
    let [attempts, setAttempts] = useState(0)
    let [randomChoices, setChoices] = useState(_.sampleSize(DATA, 8))
    let [correctAnswer, setCorrect] = useState(_.sample(randomChoices))
    let [successModal, setModal] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        setScore(0)
        setAttempts(0)
    }, [isFocused])
    useEffect(() => {
        setChoices(_.sampleSize(DATA, 8))
        if (attempts === 10) {
            setModal(!successModal)
        }
    }, [attempts])
    useEffect(() => {
        setCorrect(_.sample(randomChoices))
    }, [randomChoices])

    let adjustScore = (name) => {
        if (name === correctAnswer.name) {
            setScore(score + 1)
        }
        setAttempts(attempts + 1)
    }

    

    let ShowSuccess = () => {
        return (
            <Modal animationType='slide' transparent={false} visible={successModal} >
                <SafeAreaView style={styles.container}>
                    <View style={styles.modal}>
                        <Text>You have registered successfully!</Text>
                        <Text>{score}</Text>
                    </View>
                    <Button title="Quit" onPress={() => {
                        setModal(!successModal)
                        navigation.navigate("Home")
                    }} />
                    <Button title="Play Again" onPress={() => {
                        setModal(!successModal)
                        setAttempts(0)
                        setScore(0)
                    }} />
                </SafeAreaView>
            </Modal>
        )
    }

    const CountryGuess = ({ item }) => {
        return (
            <TouchableHighlight underlayColor={item.name === correctAnswer.name ? 'green' : 'red'} style={styles.touchable} onPress={() => { adjustScore(item.name) }}>
                <View style={styles.card}>
                    <Text style={styles.cardText}>{item.name.trim().split("(")[0]}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <View style={styles.row}>
                <Text style={styles.titleText}>Guessing Game</Text>
                <Text style={styles.titleText}>Score: {score}</Text>
            </View>

            <View style={styles.guessImage}>
                <Image style={styles.flag} source={{ uri: correctAnswer.flags.png }} />
            </View>
            <View style={styles.guessCards}>
                <FlatList numColumns={2} data={randomChoices} renderItem={CountryGuess} />
            </View>
            <ShowSuccess />
        </SafeAreaView>
    );
}

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});

const styles = StyleSheet.create({
    titleText: {
        fontSize: 23,
        fontWeight: "bold",
        margin: 10,
        marginBottom: 0
    },
    guessImage: {
        margin: 10,
        flex: 3
    },
    flag: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        borderColor: "black",
        borderWidth: 5,
    },
    guessCards: {
        flex: 7,
        flexDirection: "column-reverse"

    },
    touchable: {
        flex: 1,
        width: "45%",
        margin: 10,
        backgroundColor: "rgba(255,255,255,0.75)",
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 6,
        borderRadius: StyleSheet.hairlineWidth * 20,

    },
    card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    cardText: {
        fontSize: 25,
        padding: 10
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    }

})


export default connect(mapState, mapDispatch)(Game);