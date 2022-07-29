import React from "react";

import {
  createDrawerNavigator, DrawerItem, DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import { View, Text, Image, TouchableOpacity} from "react-native";
import { ContactStackNavigator, DrawerContentStackNavigator, EventsStackNavigator, SearchStackNavigator, StylistStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';


const auth = getAuth();

const Drawer = createDrawerNavigator();

function AppDrawerContent(props) {
  const { user } = useAuthentication();
  // console.log('USER', auth.currentUser.uid)
  return (
<View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#ffffff',
            marginBottom: 0,
            // shadowOpacity: .1
          }}
        >
          <View>
          <Text>{user?.displayName}</Text>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 40, height: 40, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#ffffff',
          padding: 20,
        }}
      >
        <DrawerItem
          label="Log out"
          onPress={() => signOut(auth)}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        />
      </TouchableOpacity>
    </View>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}
      drawerContent={props => <AppDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
      <Drawer.Screen name="Stylist" component={StylistStackNavigator} />
      <Drawer.Screen name="Events" component={EventsStackNavigator} />
      <Drawer.Screen name="Drawer Content" component={DrawerContentStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;