import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { UpdateData } from './redux/actions/index';

const MainPage = ({ DATA, navigation }) => {
    const CountryTab = ({item}) => {
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <FlatList data={DATA} renderItem={CountryTab} />
        </SafeAreaView>
    );
}

const mapDispatch = { UpdateData };
const mapState = (store) => ({
    DATA: store.dataReducer.DATA,
});


export default connect(mapState, mapDispatch)(MainPage);