import 'react-native-gesture-handler';
import { StyleSheet, Text, View, LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './BottomTab';
import { MainStackNavigator } from './navigation/StackNavigator';
import BottomTabNavigator from "./navigation/TabNavigator";
import DrawerNavigator from './navigation/DrawerNavigator';
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])

export default function App() {
  return (
      <NavigationContainer>
       <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        {/* <BottomTab /> */}
        {/* <BottomTabNavigator /> */}
        <DrawerNavigator />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
