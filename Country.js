import { StyleSheet, Text, View, SafeAreaView, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';
import * as Svg from 'react-native-svg';

const Country = ({ DATA, navigation, item }) => {
    
    return (
        <SafeAreaView style={styles.container}>
            <Text>{item.name}</Text>
        </SafeAreaView>
    );
}

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});

const styles = StyleSheet.create({
    container: {
        flex:1
    },
})

export default connect(mapState, mapDispatch)(MainPage);