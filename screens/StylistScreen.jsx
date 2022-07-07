import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, RefreshControl } from 'react-native'
import personData from "../personData";
import AsyncStorage from '@react-native-async-storage/async-storage';

let STORAGE_KEY = '@propData';

export default function StylistScreen({ route, navigation }) {

    return (
        <View >
            <Text>Stylist Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff',
    },
    container__nodata: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: -55,
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
        bottom: 40
    },
    cardBrand: {
        color: '#000',
        bottom: 40
    },
    cardImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
    },
    cardAvatar: {
        zIndex: 1,
        marginRight: 0,
        width: 45, height: 45,
        resizeMode: 'flex',
        borderRadius: 180 / 2,
        bottom: 55,
        marginRight: 0
    },
    cardContent: {
        zIndex: 1,
        bottom: 55,
        padding: 10,
        borderBottomWidth: .4,
        // borderTopWidth: 1,
        borderColor: 'black'
    }
})