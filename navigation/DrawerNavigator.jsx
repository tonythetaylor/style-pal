import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator, DrawerContentStackNavigator, EventsStackNavigator, SearchStackNavigator, StylistStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "white",
        headerBackTitle: "Back",
      }}>
      {/* <Drawer.Screen name="Search" component={SearchStackNavigator} /> */}
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
      <Drawer.Screen name="Stylist" component={StylistStackNavigator} />
      <Drawer.Screen name="Events" component={EventsStackNavigator} />
      <Drawer.Screen name="Drawer Content" component={DrawerContentStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;