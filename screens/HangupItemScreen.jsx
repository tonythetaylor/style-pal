
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Storage, Text, View, TouchableOpacity, Alert, ImageBackground, Button, Image, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane, faCancel } from '@fortawesome/free-solid-svg-icons'
import { TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'

import uuid from 'react-native-uuid';

const clothingItems = ["Shirt", "Pants", "Shoes"]

const ShowImagePicker = ({ renderItem }) => (
    <View renderItem={renderItem} style={{ width: 10, height: 15, marginLeft: 1, marginTop: 1 }}>
    </View>
);

const HangupItemScreen = ({ navigation }) => {    
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [brand, onChangeBrand] = useState("");
    const [brandStyle, onChangeBrandStyle] = useState("");
    const [itemColor, onChangeColor] = useState("");
    const [itemSize, onChangeSize] = useState("");
    const [selection, setSelection] = useState([])    

    // useEffect(() => {
    //    setPickedImagePath('')
    //    onChangeBrand('')
    //    onChangeBrandStyle('')
    //    onChangeColor('')
    //   }, []);

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    }

    const sendData = () => {
        const d = {
            data: {
                id: uuid.v4(),
                style: brandStyle,
                colorway: itemColor,
                release: 2022,
                brand: brand,
                url: pickedImagePath,         
                type: selection,

            }
        }

        navigation.navigate('Closet', { ...d })
        // console.log(brandStyle, itemColor, brand, pickedImagePath)
        setPickedImagePath('')
        setPickedImagePath('')
        onChangeBrand('')
        onChangeBrandStyle('')
        onChangeColor('')
        onChangeColor([])
        // navigation.setParams({ data: null });

    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title="Select an image" color="#000" />
                <Button onPress={openCamera} title="Open camera" color="#000" />
            </View>

            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' &&
                    <View>
                        <Image
                            source={{ uri: pickedImagePath }}
                            style={styles.image}
                        />
                    </View>

                }
                <View style={styles.container__input}>
                    {
                        pickedImagePath !== '' &&
                        <SafeAreaView>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => onChangeBrand(text)}
                                value={brand}
                                mode="outlined"
                                label="Brand"
                                outlineColor="black"
                                selectionColor="black"
                                activeOutlineColor="black"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => onChangeBrandStyle(text)}
                                value={brandStyle}
                                mode="outlined"
                                label="Style"
                                outlineColor="black"
                                activeOutlineColor="black"
                            />
                            <TextInput
                                style={styles.input}
                                // onChangeText={onChangeColor}
                                onChangeText={(text) => onChangeColor(text)}
                                value={itemColor}
                                mode="outlined"
                                label="Color"
                                outlineColor="black"
                                activeOutlineColor="black"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => onChangeSize(text)}
                                value={itemSize}
                                mode="outlined"
                                label="Size"
                                outlineColor="black"
                                selectionColor="black"
                                activeOutlineColor="black"
                            />
                            <SelectDropdown
                                data={clothingItems}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setSelection(selectedItem)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            />
                        </SafeAreaView>
                    }
                </View>
            </View>
            <ShowImagePicker style={styles.screen} renderItem={showImagePicker} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={sendData} style={{ padding: 10, paddingLeft: 15 }}>
                    <FontAwesomeIcon icon={faPaperPlane} size={23} color={"#000"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10, paddingLeft: 15 }}>
                    <FontAwesomeIcon icon={faCancel} size={23} color={"#000"} />
                </TouchableOpacity>

                {/* <Button title="Go back" onPress={() => navigation.goBack()}  color="#000" /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff'
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: .25,
    },
    imageContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: "row",
    },
    image: {
        width: 200,
        height: 200,
        // height: '85%',
        resizeMode: 'cover',
    },
    container__input: {
        flex: 2,
        paddingTop: 5,
        // width: '100%'
    },
    input: {
        margin: 2,
        marginLeft: 5,
        backgroundColor: 'white',

        // height: 40,
        // borderColor: '#000',
        height: 35

        // borderWidth: .25
    },
});

export default HangupItemScreen