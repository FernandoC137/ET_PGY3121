import axios from 'axios';

async function obtenerProductos() {
  try {
    const response = await axios.get('http://localhost:8000/api/tienda/productos/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return [];
  }
}

export { obtenerProductos };
