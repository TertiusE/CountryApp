import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableHighlight, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData,UpdateHistory } from './redux/actions/index';
import { useEffect, useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash';



const Game = ({ DATA,HISTORY, UpdateHistory, navigation }) => {
    let [score, setScore] = useState(0)
    let [attempts, setAttempts] = useState(0)
    let [randomChoices, setChoices] = useState(_.sampleSize(DATA, 8))
    let [correctAnswer, setCorrect] = useState(_.sample(randomChoices))
    let [successModal, setModal] = useState(false)
    const isFocused = useIsFocused()

    let game_vector = useRef(new Animated.Value(0)).current
    let over_vector = useRef(new Animated.Value(0)).current
    let pulse = useRef(new Animated.Value(0)).current

    const changeScale = () => {
        Animated.sequence([
            Animated.delay(300),
            Animated.timing(game_vector, { toValue: 1, duration: 700, useNativeDriver: false }),
            Animated.timing(over_vector, { toValue: 1, duration: 700, useNativeDriver: false }),
            Animated.timing(pulse, { toValue: 1, duration: 3000, useNativeDriver: false }),
        ]).start()
    }

    useEffect(() => {
        setScore(0)
        setAttempts(0)
        game_vector.setValue(0)
        over_vector.setValue(0)
        pulse.setValue(0)
    }, [isFocused])
    useEffect(() => {
        setChoices(_.sampleSize(DATA, 8))
        if (attempts === 10) {
            setModal(!successModal)
            changeScale()
            UpdateHistory({"score":score,"date": new Date()})
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
                        <View style={styles.gameOverView}>
                            <Animated.Text style={[styles.centertext, styles.gameOver, { transform: [{ scale: game_vector }] }]}>GAME</Animated.Text>
                            <Animated.Text style={[styles.centertext, styles.gameOver, { transform: [{ scale: over_vector }], color: over_vector.interpolate({ inputRange: [0, 1], outputRange: ['black', 'red'] }) }]}>OVER</Animated.Text>
                        </View>

                        <TouchableWithoutFeedback onLongPress={() => { }}>
                            <Animated.View style={[styles.scoreView, { transform: [{ scale: pulse.interpolate({ inputRange: [0, 0.25, 0.50, 0.75, 1], outputRange: [1, 1.02, 1, 1.02, 1] }) }] }]}>
                                <Text style={[styles.centertext, styles.score]}>SCORE</Text>
                                <Text style={[styles.centertext, styles.score]}>{score}</Text>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableHighlight underlayColor={"red"} style={styles.customButton} onPress={() => {
                            setModal(!successModal)
                            game_vector.setValue(0)
                            over_vector.setValue(0)
                            pulse.setValue(0)
                            navigation.navigate("Home")
                        }}>
                            <Text style={styles.buttonText}>Quit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor={"green"} style={styles.customButton} onPress={() => {
                            setModal(!successModal)
                            setAttempts(0)
                            setScore(0)
                            game_vector.setValue(0)
                            over_vector.setValue(0)
                            pulse.setValue(0)
                        }}>
                            <Text style={styles.buttonText}>Play Again</Text>
                        </TouchableHighlight>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    const CountryGuess = ({ item }) => {
        return (
            <TouchableHighlight underlayColor={'#2980B9'} style={styles.touchable} onPress={() => { adjustScore(item.name) }}>
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

const mapDispatch = { UpdateData, UpdateHistory };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
    HISTORY: store.dataReducer.HISTORY
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        margin: 10,
        marginBottom: 0,
        shadowColor: "rgba(0,0,0,0.75)",
        shadowOffset: {width: 5, height: 7},
        shadowOpacity: 0.4
    },
    guessImage: {
        margin: 10,
        marginTop:0,
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
        shadowColor: "rgba(0,0,0,0.75)",
        shadowOffset: {width: 5, height: 7},
        shadowOpacity: 0.2,

    },
    card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    cardText: {
        fontSize: 23,
        padding: 10
    },
    row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    customButton: {
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 8,
        borderRadius: StyleSheet.hairlineWidth * 15,
        width: "45%",
        margin: 10

    },
    buttonText: {
        fontSize: 25,
        textAlign: "center",
        padding: 15,
    },
    centertext: {
        textAlign: "center"
    },
    gameOver: {
        fontSize: 60,
        fontWeight: "bold",
        margin: 5
    },
    scoreView: {
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth * 8,
        borderRadius: StyleSheet.hairlineWidth * 15,
        width: "50%",
        alignSelf: "center",
        margin: 15,
        padding: 20
    },
    score: {
        fontSize: 40
    },
    gameOverView: {
        flexDirection: "row"
    }
})


export default connect(mapState, mapDispatch)(Game);