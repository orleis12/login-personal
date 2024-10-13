import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { VictoryPie } from 'victory-native';

const StatisticsScreen = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Hacer la solicitud a la API
        axios.get('https://disease.sh/v3/covid-19/all')
            .then(response => {
                setData(response.data);
                setLoading(false);
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

    // Datos para la gráfica
    const pieData = [
        { x: "Casos Activos", y: data.active },
        { x: "Recuperados", y: data.recovered },
        { x: "Muertes", y: data.deaths },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Estadísticas de COVID-19</Text>
            <View style={styles.chartContainer}>
                <VictoryPie
                    data={pieData}
                    colorScale={["#FF9A9E", "#FAD0C4", "#FBC2EB", "#FAE3D9"]}
                    labels={() => null} // Quitar los títulos
                    style={{
                        labels: {
                            fontSize: 15,
                            fill: "white",
                        },
                    }}
                    width={Dimensions.get('window').width - 40} // Ajustar al ancho de la pantalla
                    height={250} // Puedes ajustar la altura según tu necesidad
                />
            </View>
            <Text style={styles.text}>Total de casos: {data.cases}</Text>
            <Text style={styles.text}>Total de muertes: {data.deaths}</Text>
            <Text style={styles.text}>Total de recuperados: {data.recovered}</Text>
            <Text style={styles.text}>Casos activos: {data.active}</Text>
            <Text style={styles.text}>Casos críticos: {data.critical}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1', // Color de fondo
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
    chartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Espaciado inferior para separar la gráfica del texto
    },
    text: {
        fontSize: 18,
    },
});

export default StatisticsScreen;
