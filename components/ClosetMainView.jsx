import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowUpFromBracket, faT, faP, faS } from '@fortawesome/free-solid-svg-icons'

import AsyncStorage from '@react-native-async-storage/async-storage';

import pantsData from "../bottomData";
import shoeData from "../shoeData";
import shirtData from "../topdata";

import { readData } from '../database/firebase_clthg';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width;
export const ITEM_HEIGHT = Dimensions.get('window').height / 2;

const STORAGE_KEY = [
    { typeShirts: 'shirts' },
    { typePants: 'pants' },
    { typeShoes: 'shoes' }
]

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={{ width: '100%', height: '100%', left: 15, marginLeft: 1, marginTop: 1, alignContent: 'center', justifyContent: 'center' }}>
        {/* <FontAwesomeIcon icon={faArrowUpFromBracket} color={'white'} size={30} /> */}
        <Text style={{ color: 'white' }}>Remove Item</Text>
    </TouchableOpacity>
);

const ClosetMainView = ({ route, navigation }) => {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([])
    const [toggle, setToggle] = useState(false)
    const [optionsIndex, setOptionsIndex] = useState(0);
    const [selectedArr, setSelectedArr] = useState([]);
    const [firebaseData, setData] = useState([])

    const [shirts, setShirtData] = useState([])
    const [pants, setPantsData] = useState([])
    const [shoes, setShoesData] = useState([])

    const { data } = route.params;
    // console.log( firebaseData)

    const setClosetByItem = async (item) => {
        // console.log('setClosetByItem', item, data)
        item.map((byItem) => {
            if (byItem.type === 'Shirt' || data.type === 'Shirt') {
                let updateList = new Array()
                updateList.push(byItem)
                console.log('setShirtData', updateList)
                setShirtData(current => [byItem, ...current])
            }

            if (byItem.type === 'Pants' || data.type === 'Pants') {
                let updateList = new Array()
                updateList.push(byItem)
                console.log('setPantsData', updateList)
                setPantsData(current => [byItem, ...current])
            }

            if (byItem.type === 'Shoes' || data.type === 'Shoes') {
                let updateList = new Array()
                updateList.push(byItem)
                console.log('setShoeData', updateList)
                setShoesData(current => [byItem, ...current])
            }
        })
    }

    const matchItems = (selectedItems) => {
        console.log('LETS MATCH', selectedItems)
        if (selectedItems !== undefined) {
            navigation.navigate('Todays Picks',
            {
                screen:`Today's picks`, 
                params: {selectedItems},
            })
        }
    }

    const pickItem = (item) => {
        // place non unique id's into an empty array
        let matchId = []
        for (const prop in items) {
            if (items[prop].id === item.id) {
                alert(`${item.style} is already selected`)
                matchId.push(items[prop].id)
            }
        }
        // if the selected id doesnt match, add the item to the items array
        if (matchId != item.id) {
            setItems(arr => [item, ...arr])
        }
    }

    const hangItemUp = (item) => {
        // this is the line that you are looking for
        // setItems((oldState) => oldState.filter((item) => item !== items));

        setSelected(current => [...current]);

        const index = items.indexOf(item);
        console.log(index)
        if (index > -1) { // only splice array when item is found
            items.splice(index, 1); // 2nd parameter means remove one item only
        }

        // setSelected(current => [...current, item]);
    };

    const toggleActiveItem = (index) => {
        console.log(index)
        if (selectedArr.includes(index)) {
            setSelectedArr(selectedArr.filter((i) => i !== index))
            // setToggle(true)
        } else {
            setSelectedArr([...selectedArr, index])
        }

        setOptionsIndex(index)
        console.log(optionsIndex)

    }

    const mainView = ({ item }) => {
        return (
            <View
                style={{
                    flex: 3,
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <TouchableOpacity
                    onPress={() => pickItem(item)}>
                    <Image
                        source={{ uri: item.url }}
                        style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
                    />
                </TouchableOpacity>
                <Text>
                    {item.style}
                </Text>
            </View>
        );
    };

    const saveData = async (item) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY[0].typeShirts, JSON.stringify(item))
            console.log('Data successfully saved')
        } catch (e) {
            alert('Failed to save the data to the storage')
        }
    }

    // const readData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('shirts');
    //         console.log('readData: ', value)
    //       if (value !== null) {
    //         const _v = JSON.parse(value)
    //         setSelected(current => [_v, ...current]);
    //       }
    //     } catch (e) {
    //       alert('Failed to fetch the input from storage');
    //     }
    //   };

    //   console.log('shirt data -----> ',  shirts)
    //   console.log('pants data -----> ',  pants)
    //   console.log('shoes data -----> ',  shoes)
    //   console.log('SELECTED ITEMS &&&&&&&&&&', items)

    useEffect(() => { 
        if (data.type === 'Shirt') {
            setShirtData(current => [data, ...current])
            setSelected(current => [data, ...current]);
            navigation.setParams({ data: {} })
        }

        if (data.type === 'Pants') {
            setPantsData(current => [data, ...current])
            setSelected(current => [data, ...current]);
            navigation.setParams({ data: {} })
        }

        if (data.type === 'Shoes') {
            setShoesData(current => [data, ...current])
            setSelected(current => [data, ...current]);
            navigation.setParams({ data: {} })
        }
    }, [data]);

    //   useEffect(() => {
    //     console.log('COFFEE', fbdata)
    //     setClosetByItem(data)
    //     // console.log(readData())
    //     // setTimeout(() => {
    //     //     setLoading(false);
    //     // }, 5000);
    // }, [])

    useEffect(() => {

        // setTimeout(() => {
            //     setLoading(false);
            readData()
                .then(userList => {
                    // console.log('COFFEE:', userList)
                    setClosetByItem(userList)
                    // setSelected(current => [userList, ...current]);

                })
                .catch(error => {
                    // handle any error state, rejected promises, etc..
                });

        // }, 1000);





        // console.log('TEST [] ', fbData)
        // setData(readData())
        // setTimeout(() => {
        //     setLoading(false);
        // }, 5000);
    }, [])

    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            {/* main stage view */}
            <View style={{
                flex: 3,
                backgroundColor: "#fff",
                justifyContent: "center",
            }} >
                <View style={{
                    flex: 0.1,
                    flexDirection: 'row',
                    zIndex: 1,
                    alignItems: "space-between",
                    // paddingLeft: 5,
                    // justifyContent: "space-between"
                }}>
                    <View style={{ top: 5, marginLeft: 20, marginRight: 20, flex: 1, flexDirection: "row", justifyContent: "space-between", borderRadius: 5, borderWidth: 2, borderColor: 'white', backgroundColor: 'white' }}>
                        <TouchableOpacity onPress={() => setSelected(shirts)}>
                            {/* <FontAwesomeIcon icon={faT} color={'black'} size={24} /> */}
                            <Text style={{ color: 'black', borderRadius: 5, borderWidth: .50, borderColor: 'black', padding: 5 }}>SHIRTS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => setSelected(pants)}>
                            {/* <FontAwesomeIcon icon={faP} color={'black'} size={24} /> */}
                            <Text style={{ color: 'black', borderRadius: 5, borderWidth: .50, borderColor: 'black', padding: 5 }}>PANTS</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => setSelected(shoes)}>
                            {/* <FontAwesomeIcon icon={faS} color={'black'} size={24} /> */}
                            <Text style={{ color: 'black', borderRadius: 5, borderWidth: .50, borderColor: 'black', padding: 5 }}>SHOES</Text>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => matchItems(items)}>
                            {/* <FontAwesomeIcon icon={faS} color={'black'} size={24} /> */}
                            <Text style={{ color: 'black', borderRadius: 5, borderWidth: .50, borderColor: 'black', padding: 5 }}>MATCH</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {data !== 'undefined' && selected.length !== 0 ?
                    <Carousel
                        data={selected}
                        renderItem={mainView}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                    />
                    :
                    <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', top: -75, zIndex: 1 }}>
                        <Text >Select a category to add clothing items</Text>
                        <View style={{ width: SLIDER_WIDTH }}></View>
                    </View>
                }
            </View>
            {/* picked stage view */}
            <View style={{ backgroundColor: "white", height: 150 }} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {items.map((item, idx) =>
                        <View key={idx}>
                            {optionsIndex == items[idx] ? toggle && (
                                <View key={idx} style={{ backgroundColor: "black", height: 40, alignContent: 'center', justifyContent: 'center' }}>
                                    <AppButton onPress={() => hangItemUp(item)} />
                                </View>
                            ) : []}
                            <TouchableOpacity onPress={() => { toggleActiveItem(item), setToggle(!toggle) }}>
                                <Image
                                    source={{ uri: item.url }}
                                    style={{ width: 115, height: 150 }}
                                />
                            </TouchableOpacity>
                            {/* <Image source={{ uri: item.url }} style={{ width: 100, height: 100 }} /> */}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

export default ClosetMainView;

const styles = StyleSheet.create({
    container: {
        flex: 3,
        // padding: 20,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "white",
    },
});