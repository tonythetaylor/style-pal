import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDoorOpen, faCameraAlt, faShirt, faPlus } from '@fortawesome/free-solid-svg-icons'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import UserScreen from './screens/UserScreen';
import CameraScreen from './screens/CameraScreen';


const Tab = createBottomTabNavigator();
const BottomTab = ({ navigation }) => {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarInactiveTintColor: 'black',
            tabBarActiveTintColor: '#10498f'
          }}>
            <Tab.Screen
                name={'Past Looks'}
                component={ProductScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size, color }) => (<Icon name={"home"} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    }
                }} />
            <Tab.Screen
                name='Closet'
                component={UserScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size, color }) => (<FontAwesomeIcon icon={faDoorOpen} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    }
                }} />
            <Tab.Screen
                name={`Today's picks`}
                component={HomeScreen}
                options={({ route, navigation }) => ({ // transform screenOptions to a function
                    tabBarLabel: '',
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
                })}
            // options={{
            //     tabBarLabel: '',
            //     tabBarIcon: ({ size, color }) => (<FontAwesomeIcon icon={faShirt} color={color} size={size} />),
            //     tabBarItemStyle: {
            //         margin: 5,
            //         borderRadius: 16,
            //         top: 10
            //     }
            // }} 
            />
            <Tab.Screen
                name={'+Style'}
                component={CameraScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size, color }) => (<FontAwesomeIcon icon={faCameraAlt} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    }
                }} />
        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})