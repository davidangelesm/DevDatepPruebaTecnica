import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const getProducts = async (search = '', category = '') => {
    await new Promise(resolve => setTimeout(resolve, 1200)); // delay simulado 
    
    const params = {};
    if (search) params.name_contains = search;
    if (category) params.category = category;

    const response = await api.get('/products', { params });
    return response.data;
}

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const response = await api.get(`/products/${id}`);
  return response.data;
};