import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, TouchableOpacity, FlatList, Text, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import SearchBar from '../components/SearchBar';
import Entypo from '@expo/vector-icons/Entypo';
import { THEME_PRIMARY_COLOR, THEME_SECONDARY_COLOR, THEME_DANGER_COLOR } from '../constant';
import Card from '../components/Card';
import {chargers} from '../db.json'
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import Modal from "react-native-modal";
import FontAwesome from '@expo/vector-icons/FontAwesome';


const screenWidth = Dimensions.get('window').width;

const ChargingMarkerView = ({index}) => <View style={styles.marker_view}>
    <Text style={{fontWeight: '900', fontSize: 18}}>{index+1}</Text>
</View>

const HomeScreen = () => {

    const [errorMsg, setErrorMsg] = useState(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 12.8822556,
        longitude: 77.6152,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const mapRef = useRef(0);

    useEffect(() => {
        (async () => {
            setIsModalVisible(true)
            setLoading(true)
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setLoading(false)
                return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            setInitialRegion({
                ...initialRegion,
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
            })
            setIsModalVisible(false)
            setLoading(false)
            goToMyLocation()
        })();
    }, []);

    const goToMyLocation = async () => {
        mapRef.current.animateCamera({center: {latitude: initialRegion.latitude, longitude: initialRegion.longitude}});
    }

    const takeSnapshot = () => {
        // 'takeSnapshot' takes a config object with the
        // following options
        const snapshot = mapRef.current.takeSnapshot({
          width: 300,      // optional, when omitted the view-width is used
          height: 300,     // optional, when omitted the view-height is used
          format: 'png',   // image formats: 'png', 'jpg' (default: 'png')
          quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
          result: 'file'   // result types: 'file', 'base64' (default: 'file')
        });
        snapshot.then((uri) => {
        //   this.setState({ mapSnapshot: uri });
        console.log(uri);
        });
    }
    

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header_container}>
                <TouchableOpacity style={styles.menu} onPress={takeSnapshot}>
                    <Entypo name="menu" size={25} color={THEME_SECONDARY_COLOR} />
                </TouchableOpacity>
                <SearchBar />
            </View>
            <MapView provider={PROVIDER_GOOGLE} ref={mapRef} style={styles.map} initialRegion={initialRegion} onMapReady={goToMyLocation} >
                {chargers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude)}}
                        title={marker.name}
                        description={marker.address}
                    >
                        <ChargingMarkerView index={index} />
                    </Marker>
                ))}
                <Marker
                        coordinate={{latitude: initialRegion.latitude, longitude: initialRegion.longitude}}
                        title='My Location'
                        description='Current Location'
                    >
                    <FontAwesome name="location-arrow" size={30} color={THEME_DANGER_COLOR} />
                </Marker>
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
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, justifyContent:'center', alignItems: 'center' }}>
                    {loading ? 
                    <Text style={{color: 'white', fontSize: 17}}>Loading ...</Text>
                    :
                    <>
                        <Text style={{color: 'white', fontSize: 17}}>{errorMsg}</Text>
                        <TouchableOpacity onPress={Linking.openSettings} >
                            <View style={{backgroundColor: THEME_PRIMARY_COLOR, paddingVertical: 15, paddingHorizontal: 10, marginTop: 10, borderRadius:5}}>
                                <Text style={{fontWeight: '500',}}>Grant Permission</Text>
                            </View>
                        </TouchableOpacity>
                    </>}
                </View>
            </Modal>
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
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

