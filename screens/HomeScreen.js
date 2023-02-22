import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import SearchBar from '../components/SearchBar';
import Entypo from '@expo/vector-icons/Entypo';
import { THEME_PRIMARY_COLOR, THEME_SECONDARY_COLOR } from '../constant';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <View style={styles.header_container}>
            <TouchableOpacity style={styles.menu}>
                <Entypo name="menu" size={25} color={THEME_SECONDARY_COLOR} />
            </TouchableOpacity>
            <SearchBar />
        </View>
        <MapView style={styles.map} initialRegion={{
            latitude: 22.4532122,
            longitude: 77.4545322,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }} />
        
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
    },
    header_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 25,
        position: 'absolute',
        top: 30,
        zIndex:20
    },
    menu: {
        marginRight:5,
        width: 25
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

