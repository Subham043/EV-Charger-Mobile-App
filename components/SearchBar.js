import { View, TextInput, StyleSheet } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import { THEME_PRIMARY_COLOR, THEME_SECONDARY_COLOR } from '../constant';

const SearchBar = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.search_container}>
            <View style={styles.theme_dot}/>
            <TextInput 
                style={styles.search_input}
                placeholder="Seaech for the compatible chargers"
                placeholderTextColor="white"
                selectionColor={THEME_PRIMARY_COLOR}
                onChangeText={searchText => setSearchText(searchText)}
                value={searchText}
            />
            <Entypo name="sound-mix" size={22} color={THEME_PRIMARY_COLOR} />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    search_container: {
        flexDirection: 'row',
        backgroundColor: THEME_SECONDARY_COLOR,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7,
        width: "100%",
        height: 55,
    },
    theme_dot: {
        backgroundColor: THEME_PRIMARY_COLOR,
        width: 15,
        height: 15,
        borderRadius: "50%",
    },
    search_input: {
        color: 'white',
        textAlign: 'left',
        flex: 1,
        height: '100%',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        fontSize: 15
    }
});