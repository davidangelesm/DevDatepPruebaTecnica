import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createProduct, updateProduct, deleteProduct} from '../services/api.js';
import toast from 'react-hot-toast';

export const useProductsMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.success('Producto creado exitosamente');
    },
    onError: () => {
        toast.error('Error al crear el producto');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.success('Producto actualizado exitosamente');
    },
    onError: () => {
        toast.error('Error al actualizar el producto');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast.success('Producto eliminado exitosamente');
    },
    onError: () => {
        toast.error('Error al eliminar el producto');
    },
  });

  return { createMutation, updateMutation, deleteMutation };
};