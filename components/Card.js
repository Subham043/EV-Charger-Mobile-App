import { View, Text, StyleSheet, Image } from 'react-native'
import { THEME_PRIMARY_COLOR, THEME_SECONDARY_COLOR, THEME_DANGER_COLOR } from '../constant';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import image from '../assets/electrical-circuit.png';
import { useMemo } from 'react';

const ConnectorType = ({data}) => {
    
    const type = useMemo(() => data.split('-'),[data])

    switch (type[0]) {
        case "lvl1dc":
            return <ConnectorTypeCard title="Level 1 DC" description="15kW Fast Charging" power={type[1]} />
        case "lvl2dc":
            return <ConnectorTypeCard title="Level 2 DC" description="50kW Fast Charging" power={type[1]} />
        case "normalac":
            return <ConnectorTypeCard title="Normal AC" description="3kW Fast Charging" power={type[1]} />
    
        default:
            return <></>
    }
}

const ConnectorTypeCard = ({title, description, power}) => {
    return (
        <View style={styles.connector_container}>
            <View style={styles.connector_left_container}>
                <Image source={image} style={styles.image} />
                <View style={{marginLeft:15, justifyContent:'center'}}>
                    <Text numberOfLines={1} style={{color: '#fff', fontSize: 14, fontWeight: '700', letterSpacing: 2}}>{title}</Text>
                    <Text numberOfLines={1} style={{color: THEME_PRIMARY_COLOR, fontSize: 11, fontWeight: '500', marginTop: 5}}>{description}</Text>
                </View>
            </View>
            <View style={styles.connector_right_container}>
                <Text numberOfLines={1} style={{color: '#fff', fontSize: 20, fontWeight: '700', letterSpacing: 2}}>x{power}</Text>
            </View>
        </View>
    );
}

const Card = ({name, address, distance, connector_types}) => {
    
    const distanceInKm = useMemo(() => (parseFloat(parseInt(distance)/1000)).toFixed(1),[distance])
    
  return (
    <View style={styles.card_container}>
        <View style={styles.heading_container}>
            <View style={styles.left_container}>
                <Text numberOfLines={1} style={{color: 'white', fontWeight: 'bold', fontSize: 17, textTransform: 'uppercase'}}>{name}</Text>
                <View style={styles.mini_container}>
                    <Text numberOfLines={1} style={{color: '#ccc', fontWeight: 'bold', textTransform: 'capitalize'}}>{address}</Text>
                    <Text numberOfLines={1} style={{color: THEME_DANGER_COLOR, fontWeight: 'bold'}}>{distanceInKm} Km</Text>
                </View>
            </View>
            <View style={styles.right_container}>
                <FontAwesome name="location-arrow" size={30} color={THEME_DANGER_COLOR} />
            </View>
        </View>
        <View style={styles.second_container}>
            <Text numberOfLines={1} style={{color: THEME_PRIMARY_COLOR, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'left'}}>Supported Connector</Text>
        </View>
        <View>
            {
                connector_types.map((item, i) => <ConnectorType data={item} key={i} />)
            }
        </View>
        <View style={styles.bottom_container}>
            <SimpleLineIcons name="arrow-down" size={25} color='#ccc' />
        </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card_container: {
        backgroundColor: THEME_SECONDARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 11,
        width: 290,
        marginRight: 10
    },
    heading_container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    connector_container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    left_container: {
        width: '80%',
    },
    connector_left_container: {
        width: '80%',
        flexDirection: 'row',
        alignItems:'center'
    },
    right_container: {
        width: '20%',
        alignItems: 'flex-end'
    },
    connector_right_container: {
        width: '20%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    mini_container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    second_container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 11,
        marginBottom: 15,
    },
    bottom_container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    image: {
        width: 40,
        height: 40,
        objectFit: 'contain'
    }
});