import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native'
import personData from "../personData";
import AsyncStorage from '@react-native-async-storage/async-storage';

let STORAGE_KEY = '@propData';

export default function PastLooksScreen({ route, navigation }) {
    const [propData, setData] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    /* 2. Get the param */
    const { data } = route.params;
      console.log('PAST LOOKS', route)

    console.log('DEBUG 2: ', data)

    const postPastLooks = () => {
        setTimeout(() => {
            if (data != undefined) {
                const _id = personData.forEach(element => {
                    element.id
                });
                if (data.id != _id) {
                    setData(current => [data, ...current]);
                    navigation.setParams({ data: {} })
                }
            }

            if (propData.length !== 0) {
                saveData()
            }

            console.log("Delayed for 1 second.");
        }, "1000")
    }

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(propData))
            console.log('Data successfully saved')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);

            if (value !== null) {
                console.log('READ DATA:', value)
                setData(JSON.parse(value));
            }
        } catch (e) {
            alert('Failed to fetch the input from storage');
        }
    };

    const onRefresh = async () => {
        setIsFetching(true);
        setTimeout(() => {
            console.log("Delayed for 5 second.");
        }, "1000")
        setIsFetching(false);
    };
    console.log('DEBUG: ---->', propData)

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

    useEffect(() => {
        // if (propData.length > 0) {
        //     readData()
        //  }

        postPastLooks()
    }, [data]);

    return (
        <View style={styles.container}>
            {
                propData.length !== 0 ?

                    <FlatList
                        style={styles.container}
                        data={propData}
                        renderItem={renderItem}
                        keyExtractor={personData.id}
                        onRefresh={onRefresh}
                        refreshing={isFetching}
                    />
                    :
                    (
                        <View style={styles.container__nodata}>
                            <Text>It looks like you have no style... Post your fit!</Text>
                        </View>

                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container__nodata: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 25,
        paddingTop: 5
    },
    cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: '#000',
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