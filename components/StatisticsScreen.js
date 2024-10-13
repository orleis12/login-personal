import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const StatisticsScreen = () => {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    // Hacer la solicitud a la API
    axios.get('https://disease.sh/v3/covid-19/all')
    .then(response => {
        setData(response.data);
        setLoading(false);
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
        setLoading(false);
    });
}, []);

if (loading) {
    return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
    );
}

return (
    <View style={styles.container}>
    <Text style={styles.title}>Estadísticas de COVID-19</Text>
    {data ? (
        <>
        <Text style={styles.text}>Total de casos: {data.cases}</Text>
        <Text style={styles.text}>Total de muertes: {data.deaths}</Text>
        <Text style={styles.text}>Total de recuperados: {data.recovered}</Text>
        <Text style={styles.text}>Casos activos: {data.active}</Text>
        <Text style={styles.text}>Casos críticos: {data.critical}</Text>
        </>
    ) : (
        <Text style={styles.text}>No hay datos disponibles</Text>
    )}
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
},
text: {
    fontSize: 18,
},
});

export default StatisticsScreen;
