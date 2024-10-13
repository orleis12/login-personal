import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',  // Puedes cambiar el color de fondo
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',  // Color del texto principal
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',  // Color del borde
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',  // Fondo del input
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF3CBD',  // Color de fondo del botón (puedes usar un gradiente si lo prefieres)
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',  // Color del texto del botón
    fontWeight: 'bold',
  },
});

export default styles;
