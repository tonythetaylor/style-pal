import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faDoorOpen, faCameraAlt, faShirt } from '@fortawesome/free-solid-svg-icons'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import UserScreen from './screens/UserScreen';
import CameraScreen from './screens/CameraScreen';


const Tab = createBottomTabNavigator();
const BottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={'Past Looks'}
                component={ProductScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (<Icon name={"home"} color={'#000'} size={size} />),
                    tabBarItemStyle:{
                        margin:5,
                        borderRadius:16,
                        top: 10
                      }
                }} />
            <Tab.Screen
                name='Closet'
                component={UserScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (<FontAwesomeIcon icon={faDoorOpen} color={'#000'} size={size}/>),
                    tabBarItemStyle:{
                        margin:5,
                        borderRadius:16,
                        top: 10
                      }
                }} />
            <Tab.Screen
                name={`Today's picks`}
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (<FontAwesomeIcon icon={faShirt} color={'#000'} size={size}/>),
                    tabBarItemStyle:{
                        margin:5,
                        borderRadius:16,
                        top: 10
                      }
                }} />
            <Tab.Screen
                name='Camera'
                component={CameraScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => (<FontAwesomeIcon icon={faCameraAlt} color={'#000'} size={size}/>),
                    tabBarItemStyle:{
                        margin:5,
                        borderRadius:16,
                        top: 10
                      }
                }} />
        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})