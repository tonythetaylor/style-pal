import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';

import ClosetMainView from '../components/ClosetMainView';
import pantsData from "../bottomData";
import shoeData from "../shoeData";
import shirtData from "../topdata";
import brandData from "../brandData";
import ClosetGridView from '../components/ClosetGridView';

export default function UserScreen() {
    const [items, setItems] = React.useState([shirtData]);

    return (
        <>
            <View style={[
                styles.container__header, {
                    flexDirection: "row",
                }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {brandData.map((item, idx) =>
                        <View key={idx}
                            style={styles.container__header__scrollview}>
                            <Image style={styles.container__header__scrollview__image} source={{ uri: item.url }} />
                            {/* <Text style={styles.container__header__scrollview__text}>Brand Name</Text> */}
                        </View>
                    )}
                </ScrollView>
            </View>

            <ClosetMainView/>
            {/* <ClosetGridView/> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 5,
        // alignItems: "center",
        // justifyContent: 'center'
    },
    container__header: {
        height: 55,
        padding: 5,
        backgroundColor: '#fff',
        alignContent: "center"
    },
    container__header__scrollview: {
        width: 45,
        height: 45,
        borderRadius: 180 / 2,
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        alignContent: "center",
        alignItems:'center',
        justifyContent:'center'
    },
    container__header__scrollview__image: {
        width: 45,
        height: 45,
        borderRadius: 180 / 2,
        resizeMode: 'contain',
        borderWidth: .25
    },
    container__header__scrollview__text: {
        fontWeight: '600',
        fontSize: 10,
        color: '#000',
        position: 'absolute',
        bottom: -90,
        height: 90,
        width: 90,
        left: -10,
    },
    gridView: {
        marginTop: 10,
        flex: 3,
        padding: 5,
        borderBottomColor: 'black',
        //   borderBottomWidth: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 10,
        padding: 75,
        height: 150,
        width: 150
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});