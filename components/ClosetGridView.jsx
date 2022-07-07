import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import pantsData from "../bottomData";
import shoeData from "../shoeData";
import shirtData from "../topdata";
import brandData from "../brandData";

const ClosetGridView = () => {
  return (
    <View style={[styles.container, {
        // Try setting `flexDirection` to `"row"`.
        flexDirection: "column"
    }]}>
        <View style={{
            flex: 3, 
            backgroundColor: "white",
            alignItems: "center", 
            position: 'relative', 
            alignContent: "center",
        }} >
            <Text>Tops</Text>
            <FlatGrid
                itemDimension={130}
                data={shirtData}
                style={styles.gridView}
                // staticDimension={300}
                fixed
                spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code, alignContent: "center", alignItems: "center" }]}>
                        <Image source={{ uri: item.url }} style={{ width: 120, height: 120 }} />
                        <Text style={styles.itemCode}>{item.style}</Text>
                    </View>
                )}
            />

            <Text>Pants</Text>

            <FlatGrid
                itemDimension={130}
                data={pantsData}
                style={styles.gridView}
                // staticDimension={300}
                fixed
                spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code, alignContent: "center", alignItems: "center"}]}>
                        <Image source={{ uri: item.url }} style={{ width: 120, height: 120 }} />
                        <Text style={styles.itemCode}>{item.style}</Text>
                    </View>
                )}
            />
            <Text>Shoes</Text>

            <FlatGrid
                itemDimension={130}
                data={shoeData}
                style={styles.gridView}
                // staticDimension={300}
                fixed
                spacing={10}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code, alignContent: "center", alignItems: "center" }]}>
                        <Image source={{ uri: item.url }} style={{ width: 120, height: 120 }} />
                        <Text style={styles.itemCode}>{item.style}</Text>
                    </View>
                )}
            />
        </View>
        {/* <View style={{
        flex: 3, backgroundColor: "white", justifyContent: "center",
        alignItems: "center"
    }} >
        <Text>Pants</Text>

        <FlatGrid
            itemDimension={130}
            data={items}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => (
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCode}>{item.code}</Text>
                </View>
            )}
        />
    </View>
    <View style={{
        flex: 3, backgroundColor: "white", justifyContent: "center",
        alignItems: "center"
    }} >
        <Text>Shoes</Text>
        <FlatGrid
            itemDimension={130}
            data={items}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            spacing={10}
            renderItem={({ item }) => (
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCode}>{item.code}</Text>
                </View>
            )}
        />
    </View> */}

    </View>
  );
}

export default ClosetGridView;

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