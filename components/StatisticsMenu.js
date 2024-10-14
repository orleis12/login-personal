import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import axios from 'axios';
import { VictoryPie } from 'victory-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const StatisticsScreen = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation(); // Hook para navegar

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

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Aquí puedes manejar la navegación después de cerrar sesión, si es necesario
                console.log('Sesión cerrada');
                navigation.navigate('Login');
            })
            .catch(error => {
                console.error('Error al cerrar sesión: ', error);
            });
    };

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
            <View style={styles.header}>
                {user && (
                    <>
                        <Text style={styles.email}>{user.email}</Text>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
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
            <Text style={[styles.text, styles.leftAligned]}>Total de casos: {data.cases.toLocaleString()}</Text>
            <Text style={[styles.text, styles.leftAligned]}>Total de muertes: {data.deaths.toLocaleString()}</Text>
            <Text style={[styles.text, styles.leftAligned]}>Total de recuperados: {data.recovered.toLocaleString()}</Text>
            <Text style={[styles.text, styles.leftAligned]}>Casos activos: {data.active.toLocaleString()}</Text>
            <Text style={[styles.text, styles.leftAligned]}>Casos críticos: {data.critical.toLocaleString()}</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    leftAligned: {
        textAlign: 'left', // Alinear texto a la izquierda
        width: '100%', // Asegúrate de que tome todo el ancho disponible
        marginLeft:60
    },
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#f1f1f1', // Color de fondo del encabezado
    },
    email: {
        fontSize: 16,
        marginRight: 10,
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
    logoutButton: {
        backgroundColor: 'rgb(255, 60, 189)', // Un color atractivo para el botón
        padding: 10, // Espaciado interno
        borderRadius: 8, // Bordes redondeados
        marginTop: 10, // Espacio superior
        width: '35%', // Ancho del botón
        alignItems: 'center', // Centrar el texto
    },
    logoutButtonText: {
        color: '#fff', // Texto blanco
        fontSize: 16, // Tamaño del texto
        fontWeight: 'bold', // Negrita para destacar el texto
    },
});

export default StatisticsScreen;
