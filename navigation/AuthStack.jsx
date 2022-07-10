import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native'

import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignOutScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

const ClthgLogoTitle = () => {
    return (
        <Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={require('../assets/CLTHG-logo.png')}
        />
    );
}

export default function AuthStack() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
        <Stack.Screen 
        name="Sign In" 
        component={SignInScreen}
        options={{
            headerTitle: (props) => (<ClthgLogoTitle {...props} />)
        }} />
        <Stack.Screen 
        name="Sign Up" 
        component={SignOutScreen}
        options={{
            headerTitle: (props) => (<ClthgLogoTitle {...props} />)
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}