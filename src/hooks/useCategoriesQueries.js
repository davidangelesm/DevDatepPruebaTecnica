import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/api';

export const useCategoriesQueries = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};