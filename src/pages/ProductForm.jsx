import {useEffect} from 'react';
import {useParams, useNavigate, Link, data} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {productSchema} from '../schemas/productSchema';
import { useProductsMutations } from '../hooks/useProductsMutations';
import { useProductByIdQuery } from '../hooks/useProductsQueries';
import { useCategoriesQueries } from '../hooks/useCategoriesQueries';
import { boolean } from 'zod';
import {toast} from 'react-hot-toast';

export default function ProductForm(){
    const {id} = useParams();
    const navigate = useNavigate();

    const isEditing = Boolean(id);

    const {createMutation, updateMutation} = useProductsMutations();
    const {data: categories = []} = useCategoriesQueries();

    const { data: productToEdit, isLoading } = useProductByIdQuery(id, {
        enabled: isEditing
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '', 
      category: '', 
      price: '',
      image: { thumbnail: '', mobile: '', tablet: '', desktop: '' }
    }
  });

  useEffect(() => {
    if (productToEdit) {
      reset(productToEdit);
    }
  }, [productToEdit, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id });
      } else {
        await createMutation.mutateAsync(data);
      }
      navigate('/admin');
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };
  
  if (isEditing && isLoading) {
    return <div className="p-10 text-center text-rose-500 font-semibold animate-pulse">Cargando datos del producto...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin" className="text-rose-500 hover:text-red font-semibold">← Volver</Link>
        <h1 className="text-3xl font-bold text-rose-900">
          {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-xl shadow-sm flex flex-col gap-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-rose-900 text-sm">Nombre del Postre</label>
            <input 
              {...register('name')} 
              className={`p-3 rounded-lg border focus:outline-none focus:ring-1 ${errors.name ? 'border-red focus:ring-red' : 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'}`}
            />
            {errors.name && <span className="text-red text-xs font-semibold">{errors.name.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-rose-900 text-sm">Categoría</label>
            <select 
              {...register('category')} 
              className={`p-3 rounded-lg border bg-white focus:outline-none focus:ring-1 ${errors.category ? 'border-red focus:ring-red' : 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'}`}
            >
              <option value="">Selecciona una categoría...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <span className="text-red text-xs font-semibold">{errors.category.message}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-rose-900 text-sm">Precio ($)</label>
          <input 
            type="number" step="0.01"
            {...register('price')} 
            className={`p-3 rounded-lg border focus:outline-none focus:ring-1 ${errors.price ? 'border-red focus:ring-red' : 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'}`}
          />
          {errors.price && <span className="text-red text-xs font-semibold">{errors.price.message}</span>}
        </div>

        <div className="bg-rose-50 p-6 rounded-lg flex flex-col gap-4 mt-2">
          <h3 className="font-bold text-rose-900 text-sm border-b border-rose-200 pb-2">Rutas de Imágenes</h3>
          {['thumbnail', 'mobile', 'tablet', 'desktop'].map((type) => (
            <div key={type} className="flex flex-col gap-2">
              <label className="font-semibold text-rose-900 text-xs capitalize">Imagen {type}</label>
              <input 
                {...register(`image.${type}`)} 
                className={`p-2.5 text-sm rounded-lg border focus:outline-none focus:ring-1 ${errors.image?.[type] ? 'border-red focus:ring-red' : 'border-rose-300 focus:border-rose-500 focus:ring-rose-500'}`}
              />
              {errors.image?.[type] && <span className="text-red text-xs font-semibold">{errors.image[type].message}</span>}
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          disabled={createMutation.isPending || updateMutation.isPending}
          className="mt-4 bg-red text-white py-4 rounded-full font-semibold hover:bg-rose-900 transition-colors disabled:opacity-50"
        >
          {createMutation.isPending || updateMutation.isPending ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </form>
    </div>
  );
}