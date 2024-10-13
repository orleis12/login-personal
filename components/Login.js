import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import ButtonGradient from './buttons/ButtonGradient';
import ButtonGoogle from './buttons/ButtonGoogle';
import { useNavigation } from '@react-navigation/native';
//Estilos
import styles from '../styles/login.styles';

const { width, height } = Dimensions.get('window');

const SvgTop = () => (
  <Svg
    width={500}
    height={324}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M297.871 315.826c73.405 13.896 165.338-13.964 202.129-29.63V230H1.326v63.5c69.15-42.913 204.789 4.957 296.545 22.326z"
      fill="url(#prefix__paint0_linear_103:6)"
      fillOpacity={0.5}
    />
    <Path
      d="M237.716 308.627C110.226 338.066 30.987 318.618 0 304.77V0h500v304.77c-43.161-12.266-134.794-25.581-262.284 3.857z"
      fill="url(#prefix__paint1_linear_103:6)"
    />
    <Defs>
      <LinearGradient
        id="prefix__paint0_linear_103:6"
        x1={492.715}
        y1={231.205}
        x2={480.057}
        y2={364.215}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFB677" />
        <Stop offset={1} stopColor="#FF3CBD" />
      </LinearGradient>
      <LinearGradient
        id="prefix__paint1_linear_103:6"
        x1={7.304}
        y1={4.155}
        x2={144.016}
        y2={422.041}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFB677" />
        <Stop offset={1} stopColor="#FF3CBD" />
      </LinearGradient>
    </Defs>
  </Svg>
);

const Login = () => {
  const navigation = useNavigation();  // Hook para navegar
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerSVG}>
        <SvgTop />
      </View>
      <View style={styles.container}>
        <Text style={styles.titulo}>Login</Text>
        <Text style={styles.subTitle}>Sign In to your account</Text>
        
        
        <TextInput 
          placeholder="orleis12@gmail.com"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
        />
        
        
        <TextInput 
          placeholder="password"
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
        
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.forgotPassword}>Don't have an account? Create one</Text>
        </TouchableOpacity>
        
        
        <ButtonGradient onPress={() => navigation.navigate('StatisticsMenu')} />
        
        
        <ButtonGoogle />
        
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default Login;
