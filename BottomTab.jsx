import React from 'react'
import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDoorOpen, faCameraAlt, faShirt, faPlus } from '@fortawesome/free-solid-svg-icons'
import TodaysPicksScreen from './screens/TodaysPicksScreen';
import PastLooksScreen from './screens/PastLooksScreen';
import ClosetScreen from './screens/ClosetScreen';
import CameraScreen from './screens/CameraScreen';
import HangupItemScreen from './screens/HangupItemScreen';;
// import {ClthgLogoTitle} from './components/CustomHeaders';
const CameraStack = createStackNavigator();

const PastLooksLogoTitle = () => {
    return (
      <Image
        style={{ width: 125, height: 125, resizeMode: 'contain'}}
        source={require('./assets/past-looks.png')}
      />
    );
}

const ClthgLogoTitle = () => {
    return (
      <Image
        style={{ width: 100, height: 100, resizeMode: 'contain'}}
        source={require('./assets/CLTHG-logo.png')}
      />
    );
}

const TodaysPicksLogoTitle = () => {
    return (
      <Image
        style={{ width: 150, height: 150, resizeMode: 'contain'}}
        source={require('./assets/todays-picks.png')}
      />
    );
}

const AddStyleLogoTitle = () => {
    return (
      <Image
        style={{ width: 175, height: 175, resizeMode: 'contain'}}
        source={require('./assets/addStyle.png')}
      />
    );
}

function CameraStackScreen({ navigation }) {
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
                headerTitle: (props) => (<ClthgLogoTitle {...props}  />),
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
                component={PastLooksScreen}
                initialParams={{ data: {} }}
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
            <Tab.Screen
                name='Closet Screen'
                component={CameraStackScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size, color }) => (<FontAwesomeIcon icon={faDoorOpen} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    },
                    // headerRight: () => (
                    //     <TouchableOpacity onPress={() => navigation.navigate('Hanger')} style={{ padding: 10, paddingLeft: 15 }}>
                    //         <FontAwesomeIcon icon={faPlus} size={23} color={"#000"} />
                    //     </TouchableOpacity>
                    // )
                }} />
            <Tab.Screen
                name={`Today's picks`}
                component={TodaysPicksScreen}
                options={({ route, navigation }) => ({ // transform screenOptions to a function
                    tabBarLabel: '',
                    headerTitle: (props) => (<TodaysPicksLogoTitle {...props}  />),
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
                    headerTitle: (props) => (<AddStyleLogoTitle {...props}  />),
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