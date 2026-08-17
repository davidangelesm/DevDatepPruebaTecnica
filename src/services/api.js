import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://api-postres-neoc.onrender.com/' // <-- Pega aquí la URL que te dio Render
    : 'http://localhost:3000',
});

export const getProducts = async (search = '', category = '', page = 1) => {
    await new Promise(resolve => setTimeout(resolve, 1200)); // delay simulado 

    const params = {
      _page: page,
      _per_page: 8
    };
    
    if (search) params.name_contains = search;
    if (category) params.category = category;

    const response = await api.get('/products', { params });
    return {
      data :response.data.data || [],
      totalPages: response.data.pages || 1
    }
}

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (newProduct) => {
  const response = await api.post('/products', newProduct);
  return response.data;
}

export const updateProduct = async (product) => {
  const response = await api.put(`/products/${product.id}`, product);
  return response.data;
}

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
}

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};