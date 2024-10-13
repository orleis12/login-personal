// src/firebaseWeb.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig'; // Asegúrate de que esta ruta sea correcta

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Utiliza la configuración predeterminada de persistencia para la web

export { auth };
