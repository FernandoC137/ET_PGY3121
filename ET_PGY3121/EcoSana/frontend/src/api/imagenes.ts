import axios from 'axios';

async function obtenerImagenes() {
  try {
    const response = await axios.get('http://localhost:8000/api/imagenes/imagenes/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las imagenes:', error);
    return [];
  }
}

export { obtenerImagenes };