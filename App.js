import 'react-native-gesture-handler';
import { StyleSheet, Text, View, LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './BottomTab';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])

export default function App() {
  return (
      <NavigationContainer>
       <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <BottomTab />
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
