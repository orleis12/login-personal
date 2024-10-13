import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StatisticsMenu from './components/StatisticsMenu'; // Nueva pantalla


// Crea el Stack Navigator
const Stack = createStackNavigator();


export default function App() {
  return (
    /*<View style={styles.container}>
      <StatusBar style="auto" />
      <Login />
    </View>*/
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }}   name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }}   name="StatisticsMenu" component={StatisticsMenu} />
      </Stack.Navigator>
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
