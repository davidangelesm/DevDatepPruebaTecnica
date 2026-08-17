import {useQuery} from '@tanstack/react-query';
import {getProducts, getProductById} from '../services/api.js';
import { boolean } from 'zod';

export const useProductsQueries = (search = '', category = '', page = 1) => {
    return useQuery({
        queryKey: ['products', search, category, page],
        queryFn: () => getProducts(search, category, page),
    });
}

export const useProductByIdQuery = (id, options = {}) => {
    const hasValidId = Boolean(id);
    
    const isEnabled = options.isEnabled !== undefined ? Boolean(options.enabled) : hasValidId;
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
        retry: false,
        ...options,
        enabled: isEnabled
    });
}  