
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Storage, Text, View, TouchableOpacity, Alert, ImageBackground, Button, Image, SafeAreaView, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane, faCancel } from '@fortawesome/free-solid-svg-icons'


let camera = Camera;

const CameraScreen = ({ navigation }) => {
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [brand, onChangeBrand] = useState("");
    const [brandStyle, onChangeBrandStyle] = useState("");
    const [itemColor, onChangeColor] = useState([]);
    const [itemSize, onChangeSize] = useState(null);

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
        navigation.navigate('Past Looks', {
            style: brandStyle,
            colorway: itemColor,
            release: 2022,
            brand: brand,
            url: pickedImagePath
        })
        console.log(brandStyle, itemColor, brand, pickedImagePath)
        setPickedImagePath('')
        setPickedImagePath('')
        onChangeBrand('')
        onChangeBrandStyle('')
        onChangeColor('')
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title="Select an image"  color="#000" />
                <Button onPress={openCamera} title="Open camera"  color="#000" />
            </View>

            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' &&
                    <View style={styles.container__input}>
                        <Image
                            source={{ uri: pickedImagePath }}
                            style={styles.image}
                        />
                        <SafeAreaView>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeBrand}
                                value={brand}
                                placeholder="Add the brand"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeBrandStyle}
                                value={brandStyle}
                                placeholder="Add the style"
                            />
                            <TextInput
                                style={styles.input}
                                // onChangeText={onChangeColor}
                                onChangeText={onChangeColor}
                                value={itemColor}
                                placeholder="Add the color"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeSize}
                                value={itemSize}
                                placeholder="Add the size"
                                keyboardType="numeric"
                            />
                        </SafeAreaView>

                    </View>

                }
            </View>

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
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: .25,
    },
    imageContainer: {
        flex: 1,
        padding: 30,
        backgroundColor: '#fff',

    },
    image: {
        width: 400,
        height: '85%',
        resizeMode: 'cover'
    },
    container__input: {
        paddingTop: 20
    },
    input: {
        margin: 2,
        // height: 40,
        // borderColor: '#000',
        borderBottomWidth: .5,
        borderBottomColor: '#000',
        // borderWidth: .25
    },
});

export default CameraScreen