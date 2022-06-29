import React, {useEffect} from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';
import personData from "../personData";

export default function ProductScreen({ navigation }) {
   
    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: item.url }}
                    style={styles.cardImage}
                />
                <View style={styles.cardHeader}>
                    <Text category='s1' style={styles.cardTitle}>
                        {item.brand}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Closet')}>
                        <Image
                            source={{ uri: item.url }}
                            size='small'
                            style={styles.cardAvatar}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                    <Text category='p2'>{item.style}</Text>
                </View>
            </View>
        </View>
    )

    return (
        
        <FlatList
            style={styles.container}
            data={personData}
            renderItem={renderItem}
            keyExtractor={personData.id}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 25
    },
    cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardTitle: {
        color: '#000'
    },
    cardImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
      },
    cardAvatar: {
        marginRight: 16,
        width: 45, height: 45,
        resizeMode: 'contain',
        borderRadius: 180 / 2
    },
    cardContent: {
        padding: 10,
        borderBottomWidth: 0.25,
        borderTopWidth: 0.25,
        borderColor: 'grey'
    }
})