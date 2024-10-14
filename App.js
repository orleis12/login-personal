import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth'; // Importar Firebase Auth

import Login from './components/Login';
import Register from './components/Register';
import StatisticsMenu from './components/StatisticsMenu'; // Nueva pantalla

// Importar Firebase Auth (según el entorno, Web o React Native)
let auth;
if (typeof window !== 'undefined') {
  const { auth: webAuth } = require('./firebase/firebaseWeb');
  auth = webAuth;
} else {
  const { auth: nativeAuth } = require('./firebase/firebaseRN');
  auth = nativeAuth;
}

// Crear el Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listener para el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Actualiza el estado del usuario
      setLoading(false); // Desactiva el indicador de carga
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Mostrar el indicador de carga mientras se verifica la autenticación
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName={user ? 'StatisticsMenu' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StatisticsMenu"
          component={StatisticsMenu}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
