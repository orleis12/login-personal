import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Snackbar, Provider as PaperProvider } from 'react-native-paper';

// Estilos
import styles from '../styles/register.styles';

let auth;

if (typeof window !== 'undefined') {
  // Esto significa que estamos en el navegador (web)
  console.log("Estoy en la web");
  const { auth: webAuth } = require('../firebase/firebaseWeb');
  auth = webAuth;
} else {
  console.log("Estoy en la expo go android");
  const { auth: nativeAuth } = require('../firebase/firebaseRN');
  auth = nativeAuth;
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);  // Estado para controlar la visibilidad del Snackbar
  const [snackMessage, setSnackMessage] = useState('');  // Mensaje a mostrar en el Snackbar
  const navigation = useNavigation(); // Hook para navegar

  // Función para validar el formato del correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (!validateEmail(email)) {
      setSnackMessage('Por favor ingrese un correo válido.');
      setVisible(true);
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      setSnackMessage('La contraseña debe tener al menos 6 caracteres.');
      setVisible(true);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Cuenta creada:', userCredential.user);
        setSnackMessage('¡Cuenta creada con éxito!');
        setVisible(true);

        // Redirigir al login después de un breve tiempo
        setTimeout(() => {
          navigation.navigate('StatisticsMenu');
        }, 1500);  // Navegar después de 1.5 segundos
      })
      .catch((error) => {
        console.error('Error creando la cuenta:', error.message);
        setSnackMessage(`Error: ${error.message}`);
        setVisible(true);
      });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Nueva Cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Snackbar para mostrar mensajes */}
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}
          action={{
            label: 'OK',
            onPress: () => {
              setVisible(false);
            },
          }}
        >
          {snackMessage}
        </Snackbar>
      </View>
    </PaperProvider>
  );
};

export default Register;
