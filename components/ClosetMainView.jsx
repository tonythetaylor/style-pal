import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowUpFromBracket, faT, faP, faS } from '@fortawesome/free-solid-svg-icons'

import AsyncStorage from '@react-native-async-storage/async-storage';

import pantsData from "../bottomData";
import shoeData from "../shoeData";
import shirtData from "../topdata";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Dimensions.get('window').width;
export const ITEM_HEIGHT = Dimensions.get('window').height / 2;

const STORAGE_KEY = [
    {typeShirts: 'shirts'},
    {typePants: 'pants'},
    {typeShoes: 'shoes'}
]

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={{ width: '100%', height: '100%', left: 15, marginLeft: 1, marginTop: 1, alignContent: 'center', justifyContent: 'center'}}>
        {/* <FontAwesomeIcon icon={faArrowUpFromBracket} color={'white'} size={30} /> */}
        <Text style={{color:'white'}}>Remove Item</Text>
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

    const { data } = route.params;

    const setClosetByItem = async (item) => {
        if (item.type == 'Shirt') {
            let updateList = new Array()
            updateList.push(item)
            console.log('setShirtData', updateList)

            setShirtData(current => [item, ...current])
            // saveData(shirts)
        } 
        
        if (item.type == 'Pants') {
            let updateList = new Array()
            updateList.push(item)
            console.log('setPantsData', updateList)

            setPantsData(current => [item, ...current])
        } 

        if (item.type == 'Shoes') {
            let updateList = new Array()
            updateList.push(item)
            console.log('setShoeData', updateList)

            setShoesData(current => [item, ...current])
        }
    }

   const matchItems = (slectedItems) => {
    console.log('LETS MATCH', slectedItems)
   }
    
    const pickItem = (item) => {
        for(const prop in items) {
            if (items[prop].id === item.id) {
                alert(`${item.style} is already selected`)
                items.pop(item)
            }
        }
        setItems(arr => [item, ...arr])
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

    const readData = async () => {
        try {
          const value = await AsyncStorage.getItem('shirts');
            console.log('readData: ', value)
          if (value !== null) {
            const _v = JSON.parse(value)
            setSelected(current => [_v, ...current]);
          }
        } catch (e) {
          alert('Failed to fetch the input from storage');
        }
      };

    //   console.log('shirt data -----> ',  shirts)
    //   console.log('pants data -----> ',  pants)
    //   console.log('shoes data -----> ',  shoes)
    //   console.log('SELECTED ITEMS &&&&&&&&&&', items)

    useEffect(() => {

        // if (selected.length !== 0) {
        //      readData() 
        // } 
      
            if(JSON.stringify(data) !== '{}') {
                if (JSON.stringify(selected) !== '{}') {
                    setClosetByItem(data)

                    setSelected(current => [data, ...current]);
                    navigation.setParams({data: {}})
                } 
            }
      }, [data, shirts, pants]);

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
                         {/* <FontAwesomeIcon icon={faT} color={'black'} size={24} /> */}
                         <Text>[SHIRTS]</Text>
                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() =>  setSelected(pants)}>
                         {/* <FontAwesomeIcon icon={faP} color={'black'} size={24} /> */}
                         <Text>[PANTS]</Text>

                </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity style={{paddingRight: 10}} onPress={() =>  setSelected(shoes)}>
                         {/* <FontAwesomeIcon icon={faS} color={'black'} size={24} /> */}
                         <Text>[SHOES]</Text>

                </TouchableOpacity>
                </View>
                <View  style={{left: 145}}>
                <TouchableOpacity  onPress={() => matchItems(items)}>
                         {/* <FontAwesomeIcon icon={faS} color={'black'} size={24} /> */}
                         <Text>[MATCH]</Text>
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
                                <View key={idx} style={{ backgroundColor: "black", height: 40, alignContent: 'center', justifyContent: 'center'}}>
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