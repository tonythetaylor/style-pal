import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowUpFromBracket, faT, faP, faS } from '@fortawesome/free-solid-svg-icons'

import pantsData from "../bottomData";
import shoeData from "../shoeData";
import shirtData from "../topdata";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width;
export const ITEM_HEIGHT = Dimensions.get('window').height / 2;

const itemTypes = [
    {type: 'shirts', data: shirtData},
    {type: 'pants', data: pantsData},
    {type: 'shoes', data: shoeData}
]

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={{ width: 10, height: 15, marginLeft: 1, marginTop: 1 }}>
        <FontAwesomeIcon icon={faArrowUpFromBracket} color={'white'} size={12} />
    </TouchableOpacity>
);

const ClosetMainView = ({ route, navigation }) => {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([])
    const [toggle, setToggle] = useState(false)
    const [optionsIndex, setOptionsIndex] = useState(0);
    const [selectedArr, setSelectedArr] = useState([]);
    const [propData, setData] = useState({})

    const [shirts, setShirtData] = useState([])
    const [pants, setPantsData] = useState([])
    const [shoes, setShoesData] = useState([])

    // console.log('DEBUG 3 ->', route)
    const { data, type } = route.params;
    // console.log(JSON.stringify(data) === '{}')

    // if (JSON.stringify(data) === '{}') {
    //     console.log(route.params)
    // }
    // if (route != undefined) {
    //     console.log('DATA:::::::::', data)
    // }
    // console.log('PROP DATA: ', data )
    // console.log('PROP TYPE: ', selected )

    // pick an item from the main view stage, remove the item when picked
    const pickItem = (item) => {
        setItems(arr => [...arr, item])

        const index = selected.indexOf(item);
        if (index > -1) { // only splice array when item is found
            selected.splice(index, 1); // 2nd parameter means remove one item only
        }
         
    }

    const setClosetByItem = (item) => {
        if (item.type == 'Shirt') {
            let d = []
            d.push(item)
            setShirtData(d)
        } 
        
        if (item.type == 'Pants') {
            let d = []
            d.push(item)
            setPantsData(d)
        } 

        if (item.type == 'Shoes') {
            let d = []
            d.push(item)
            setShoesData(d)
        }
    }

    // setClosetByItem(data)
    // console.log('SHIRT DATA', shirts)

    const hangItemUp = (item) => {
        // this is the line that you are looking for
        // setItems((oldState) => oldState.filter((item) => item !== items));
        setSelected(current => [...current, item]);

        const index = items.indexOf(item);
        console.log(index)
        if (index > -1) { // only splice array when item is found
            items.splice(index, 1); // 2nd parameter means remove one item only
        }
    };

    const toggleActiveItem = (index) => {
        console.log(index)
        if (selectedArr.includes(index)) {
            setSelectedArr(selectedArr.filter((i) => i !== index))
            setToggle(true)
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

    useEffect(() => {
            if(JSON.stringify(data) !== '{}') {
                if (JSON.stringify(selected) !== '{}') {
                    setClosetByItem(data)
                    setSelected(current => [data, ...current]);
                    navigation.setParams({data: {}})
                } 
            }
      }, [data]);

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
                zIndex:1,
                alignItems: "space-between",
                paddingLeft: 10
            }}>
                <View>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => setSelected(shirts)}>
                         <FontAwesomeIcon icon={faT} color={'black'} size={24} />
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() =>  setSelected(pants)}>
                         <FontAwesomeIcon icon={faP} color={'black'} size={24} />
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() =>  setSelected(shoes)}>
                         <FontAwesomeIcon icon={faS} color={'black'} size={24} />
                </TouchableOpacity>
                </View>
            </View>
                <Carousel
                    data={selected}
                    renderItem={mainView}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                />
            </View>
            {/* picked stage view */}
            <View style={{ backgroundColor: "white", height: 150 }} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {items.map((item, idx) =>
                        <View key={idx}>
                            {optionsIndex == items[idx] ? toggle && (
                                <View key={idx} style={{ backgroundColor: "black", height: 15 }}>
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