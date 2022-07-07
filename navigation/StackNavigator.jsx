import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDoorOpen, faCameraAlt, faShirt, faPlus } from '@fortawesome/free-solid-svg-icons'

import { createStackNavigator } from "@react-navigation/stack";

import TodaysPicksScreen from '../screens/TodaysPicksScreen';
import PastLooksScreen from '../screens/PastLooksScreen';
import ClosetScreen from '../screens/ClosetScreen';
import CameraScreen from '../screens/CameraScreen';
import HangupItemScreen from '../screens/HangupItemScreen';
import StylistScreen from "../screens/StylistScreen";
import SearchScreen from "../screens/SearchScreen";
import EventsScreen from "../screens/EventsScreen";
import DrawerScreenContent from "../screens/DrawerScreenContent";

const PastLooksLogoTitle = () => {
    return (
        <Image
            style={{ width: 125, height: 125, resizeMode: 'contain' }}
            source={require('../assets/past-looks.png')}
        />
    );
}

const ClthgLogoTitle = () => {
    return (
        <Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={require('../assets/CLTHG-logo.png')}
        />
    );
}

const TodaysPicksLogoTitle = () => {
    return (
        <Image
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
            source={require('../assets/todays-picks.png')}
        />
    );
}

const AddStyleLogoTitle = () => {
    return (
        <Image
            style={{ width: 175, height: 175, resizeMode: 'contain' }}
            source={require('../assets/addStyle.png')}
        />
    );
}

const CameraStack = createStackNavigator();

function CameraStackNavigator({ navigation }) {
    return (
        <CameraStack.Navigator
            // initialRouteName="Closet"
            screenOptions={{
                //   headerTitle: () => (<FontAwesomeIcon icon={faShirt} color={"black"} size={35} />),
                headerShown: true,
                headerMode: 'screen',
                headerTintColor: 'black',
                //   headerStyle: { backgroundColor: 'tomato' },
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Hanger')} style={{ padding: 10, paddingLeft: 15 }}>
                        <FontAwesomeIcon icon={faPlus} size={23} color={"#000"} />
                    </TouchableOpacity>
                ),
            }}>
            <CameraStack.Screen
                name="Closet"
                options={{
                    headerTitle: (props) => (<ClthgLogoTitle {...props} />),
                }}
                component={ClosetScreen}
                initialParams={{ data: {} }}
            />
            <CameraStack.Screen
                name="Hanger"
                component={HangupItemScreen}
            // options={{
            //     headerTitle: () => (<FontAwesomeIcon icon={faShirt} color={"black"} size={35} />),
            // }} 
            />
        </CameraStack.Navigator>
    );
}

const Stack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}>
            <Stack.Screen
                name="Past Looks Screen"
                initialParams={{ data: {} }}
                component={PastLooksScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: (props) => (<PastLooksLogoTitle {...props} />),
                    tabBarIcon: ({ focused, size, color }) => (<Icon name={"home"} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    }
                }} />
        </Stack.Navigator>
    );
}

const TodaysPicks = createStackNavigator();

const TodaysPicksStackNavigator = () => {
    return (
        <TodaysPicks.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}>
            <TodaysPicks.Screen
                name={`Today's picks`}
                component={TodaysPicksScreen}
                options={({ route, navigation }) => ({ // transform screenOptions to a function
                    tabBarLabel: '',
                    headerTitle: (props) => (<TodaysPicksLogoTitle {...props} />),
                    tabBarIcon: ({ focused, size, color }) => (<FontAwesomeIcon icon={faShirt} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('+Style')} style={{ padding: 10, paddingLeft: 15 }}>
                            <FontAwesomeIcon icon={faPlus} size={23} color={"#000"} />
                        </TouchableOpacity>
                    )
                })} />
        </TodaysPicks.Navigator>
    );
}

const Closet = createStackNavigator();

const ClosetStackNavigator = () => {
    return (
        <Closet.Navigator
            screenOptions={{
                headerShown: false,
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}>
            <Closet.Screen name="Closet Screen" component={CameraStackNavigator} />

        </Closet.Navigator>
    );
}

const Camera = createStackNavigator();

const CameraNavigator = () => {
    return (
        <Camera.Navigator
            screenOptions={{
                headerTintColor: "white",
                headerBackTitle: "Back",
                // headerShown: false,
            }}>
            <Camera.Screen
                name="Camera Screen"
                component={CameraScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: (props) => (<AddStyleLogoTitle {...props} />),
                    tabBarIcon: ({ focused, size, color }) => (<FontAwesomeIcon icon={faCameraAlt} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    }
                }} />

        </Camera.Navigator>
    );
}

const Search = createStackNavigator();

const SearchStackNavigator = () => {
    return (
        <Search.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}>
            <Search.Screen name="Search Screen" component={SearchScreen} />

        </Search.Navigator>
    );
}

const Stylist = createStackNavigator();

const StylistStackNavigator = () => {
    return (
        <Stylist.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}>
            <Stylist.Screen name="Stylist Screen" component={StylistScreen} />

        </Stylist.Navigator>
    );
}

const Events = createStackNavigator();

const EventsStackNavigator = () => {
    return (
        <Events.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}>
            <Events.Screen name="Stylist Screen" component={EventsScreen} />

        </Events.Navigator>
    );
}

const DrawerContent = createStackNavigator();

const DrawerContentStackNavigator = () => {
    return (
        <DrawerContent.Navigator
            screenOptions={{
                headerShown: true,
                headerTintColor: "white",
                headerBackTitle: "Back",
            }}>
            <DrawerContent.Screen name="Stylist Screen" component={DrawerScreenContent} />

        </DrawerContent.Navigator>
    );
}

export {
    MainStackNavigator,
    TodaysPicksStackNavigator,
    ClosetStackNavigator,
    CameraNavigator,
    StylistStackNavigator,
    SearchStackNavigator,
    EventsStackNavigator,
    DrawerContentStackNavigator
};