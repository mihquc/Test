import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Game from './src/screens/Game';
import Win from './src/components/Result';

export default function App() {

  return (
    <Tab />
  );
}
const Stack = createNativeStackNavigator();
const Tab = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name='Game'
          component={Game}
        />
        <Stack.Screen
          name='Win'
          component={Win}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
