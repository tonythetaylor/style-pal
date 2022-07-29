import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDoorOpen, faCameraAlt, faShirt, faPlus, faSearch, faCamera } from '@fortawesome/free-solid-svg-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CameraScreen from '../screens/CameraScreen';

import { MainStackNavigator, TodaysPicksStackNavigator, ClosetStackNavigator, CameraNavigator, SearchStackNavigator } from "./StackNavigator";

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

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (navigation) => {
  return (
    <Tab.Navigator
    screenOptions={{
        //   headerTitle: () => (<FontAwesomeIcon icon={faShirt} color={"black"} size={35} />),
        headerShown: true,
        headerMode: 'screen',
        headerTintColor: 'black',
        //   headerStyle: { backgroundColor: 'tomato' },
        // headerRight: () => (
        //     <TouchableOpacity onPress={() => navigation.navigate('Hanger')} style={{ padding: 10, paddingLeft: 15 }}>
        //         <FontAwesomeIcon icon={faPlus} size={23} color={"#000"} />
        //     </TouchableOpacity>
        // ),
    }}>
      <Tab.Screen 
      name="Past Looks" 
      initialParams={{ data: {} }}
      component={MainStackNavigator} 
    //   initialParams={{ data: {} }}
      options={{
        headerShown: false,
          tabBarLabel: '',
        //   headerTitle: (props) => (<PastLooksLogoTitle {...props} />),
          tabBarIcon: ({ focused, size, color }) => (<Icon name={"home"} color={focused ? "#10498f" : "black"} size={24} />),
          tabBarItemStyle: {
              margin: 5,
              borderRadius: 16,
              top: 10
          }
      }}/>
      <Tab.Screen
      name='Search'
      component={SearchStackNavigator}
      options={{
        headerShown: false,
          tabBarLabel: '',
        //   headerTitle: (props) => (<PastLooksLogoTitle {...props} />),
          tabBarIcon: ({ focused, size, color }) => (<FontAwesomeIcon icon={faSearch} color={focused ? "#10498f" : "black"} size={24} />),
          tabBarItemStyle: {
              margin: 5,
              borderRadius: 16,
              top: 10
          }
      }}>

      </Tab.Screen>
      <Tab.Screen 
      name="Closet" 
      component={ClosetStackNavigator}
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
      <Tab.Screen name="Todays Picks"
      initialParams={{ data: {} }}
      component={TodaysPicksStackNavigator}
      options={({ route, navigation }) => ({ // transform screenOptions to a function
        tabBarLabel: '',
        headerShown: false,

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
     />
      {/* <Tab.Screen  
                name={'+Style'}
                component={CameraNavigator}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    headerTitle: (props) => (<AddStyleLogoTitle {...props}  />),
                    tabBarIcon: ({ focused, size, color }) => (<FontAwesomeIcon icon={faCameraAlt} color={focused ? "#10498f" : "black"} size={24} />),
                    tabBarItemStyle: {
                        margin: 5,
                        borderRadius: 16,
                        top: 10
                    }
                }} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;