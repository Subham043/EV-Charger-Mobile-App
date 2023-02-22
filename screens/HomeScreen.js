import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchBar from '../components/SearchBar';
import Entypo from '@expo/vector-icons/Entypo';
import { THEME_PRIMARY_COLOR, THEME_SECONDARY_COLOR } from '../constant';
import Card from '../components/Card';
import {chargers} from '../db.json'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';


const screenWidth = Dimensions.get('window').width;

const ChargingMarkerView = ({index}) => <View style={styles.marker_view}>
    <Text style={{fontWeight: '900', fontSize: 18}}>{index+1}</Text>
</View>

const HomeScreen = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    console.log(text);
    

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
            }} >
                {chargers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        title={marker.name}
                        description={marker.address}
                    >
                        <ChargingMarkerView index={index} />
                    </Marker>
                ))}
            </MapView>
            <View style={styles.footer_container}>
                <FlatList
                    data={chargers}
                    renderItem={({item}) => <Card {...item} />}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}
                    initialNumToRender={2}
                />
            </View>
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
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 25,
        position: 'absolute',
        top: 50,
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
    footer_container: {
        flex: 1,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 5,
        position: 'absolute',
        bottom: 30,
        zIndex:20,
    },
    marker_view: {
        width: 30, 
        height: 30, 
        backgroundColor: THEME_PRIMARY_COLOR, 
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

