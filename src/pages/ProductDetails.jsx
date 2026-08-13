import { useParams, Link } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {getProductById} from '../services/api.js';
import NotFound from './NotFound.jsx';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton.jsx';

export default function ProductDetail() {
  const { id } = useParams();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    retry: false,
  });

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    if (error.response?.status === 404) {
      return <NotFound />;
    }
    return (
      <div className="text-center p-10 text-red font-bold">
        Error de conexión al cargar el producto.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <Link to="/" className="text-rose-500 hover:text-red flex items-center gap-2 mb-8 font-semibold">
        ← Volver al catálogo
      </Link>
      
      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <picture className="w-full md:w-1/2">
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <img 
            src={product.image.mobile} 
            alt={product.name} 
            className="w-full rounded-xl object-cover shadow-sm"
          />
        </picture>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <p className="text-rose-500 font-semibold tracking-wide uppercase">{product.category}</p>
          <h1 className="text-4xl font-bold text-rose-900">{product.name}</h1>
          <p className="text-3xl font-bold text-red mt-2">${product.price.toFixed(2)}</p>
          
          <button className="mt-6 bg-red text-white py-3 px-8 rounded-full font-semibold hover:bg-rose-900 transition-colors self-start">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}